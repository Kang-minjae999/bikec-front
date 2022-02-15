import PropTypes from 'prop-types';
// form
import { useState } from 'react';
import { Controller, useFormContext} from 'react-hook-form';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Popover,
} from '@mui/material';
// @types
import { NAVBAR } from '../../../../config';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { ColorManyPicker } from '../../../../components/color-utils';
import { RHFMultiCheckbox, RHFRadioGroup } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------


const onSelected = (selected, item) =>
  selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item];

ShopFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onResetAll: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default function ShopFilterSidebar({ onResetAll }) {
  const { control } = useFormContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const popopen = Boolean(anchorEl);
  const id = popopen ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-describedby={id} color="inherit" endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={handleClick}>
        상세검색
      </Button>

      <Popover
        id={id}
        open={popopen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { height:500, width:700 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Gender</Typography>
              <RHFMultiCheckbox name="gender" options={FILTER_GENDER_OPTIONS} sx={{ width: 1 }} />

              <Typography variant="subtitle1">Category</Typography>
              <RHFRadioGroup name="category" options={FILTER_CATEGORY_OPTIONS} row={false} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Colour</Typography>

              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <ColorManyPicker
                    colors={FILTER_COLOR_OPTIONS}
                    onChangeColor={(color) => field.onChange(onSelected(field.value, color))}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Price</Typography>
              <RHFRadioGroup
                name="priceRange"
                options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
                getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Rating</Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                            sx={{
                              '&:hover': { bgcolor: 'transparent' },
                            }}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '&:hover': { opacity: 0.48 },
                          ...(field.value.includes(item) && {
                            bgcolor: 'action.selected',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={onResetAll}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            Clear All
          </Button>
        </Box>
      </Popover>
    </>
  );
}
