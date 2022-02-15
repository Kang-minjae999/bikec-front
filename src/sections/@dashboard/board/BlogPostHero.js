import PropTypes from 'prop-types';
// @mui
import { Box, Avatar, Typography, Stack } from '@mui/material';

// utils
import { fyeardateTime } from '../../../utils/formatTime';


// ----------------------------------------------------------------------

BlogPostHero.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostHero({ post }) {
  const { title, author, createdAt } = post;

  return (
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
      <Typography variant="h3" sx={{ color: 'primary', mt:2 , ml:2, mr:2} }>
      {title}
      </Typography>
      <Stack
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt:2 , ml:2, mr:2 , mb:2}}>
          <Avatar alt={author.name} src={author.avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'secondary' }}>
              {author.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'secondary' }}>
              {fyeardateTime(createdAt)}
            </Typography>
          </Box>
        </Box>
        </Stack>
        </Stack>
  );
}


/*         <SpeedDial
          direction={isDesktop ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" sx={{ width: 20, height: 20 }} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial> */
