import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Pagination, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonboardItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostlist, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function BlogPosts() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [totalpage, settotalpage] = useState(0);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const [page, setpage] = useState(0);

  const getAllPosts = useCallback(async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios.get(`/api/board/free?page=${page}&size=10`, {
        headers: {
          Authorization: accessToken,
        },
      });
      if (isMountedRef.current) {
        setPosts(response.data.data.content);
        settotalpage(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, page]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  const [pagenation, setpagenation] = useState(1);

  const handleChange = useCallback(
    (event, value) => {
      setpagenation(value);
      setpage(value - 1);
      getAllPosts(page);
    },
    [getAllPosts, page]
  );

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="자유"
          links={[{ name: '게시판', href: PATH_DASHBOARD.board.motocycle }, { name: '자유' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.board.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              글쓰기
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={12}>
              <BlogPostlist post={post} />
            </Grid>
          ))}
          <Stack spacing={1}>
            <Typography>페이지: {pagenation}</Typography>
            <Pagination count={totalpage} page={pagenation} onChange={handleChange} />
          </Stack>
        </Grid>
      </Container>
    </Page>
  );
}
