// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewPostForm } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: '게시판', href: PATH_DASHBOARD.root },
            { name: '게시판명', href: PATH_DASHBOARD.blog.root },
            { name: '글쓰기' },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
