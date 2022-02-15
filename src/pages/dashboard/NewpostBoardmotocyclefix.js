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
import { BoardNewPostForm } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="글쓰기">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="정비게시판"
          links={[
            { name: '게시판', href: PATH_DASHBOARD.board.root },
            { name: '정비', href: PATH_DASHBOARD.board.motocyclefix },
            { name: '글쓰기' },
          ]}
        />

        <BoardNewPostForm />
      </Container>
    </Page>
  );
}
