import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './style.css';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import { format } from 'date-fns';
import { Datepicker, Input, localeVi } from '@mobiscroll/react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '46ch',
      '&:focus': {
        width: '46ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function SearchBar() {
  const [date, setDate] = useState([]);
  const [multipleInvalid, setMultipleInvalid] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [value1, setValue1] = useState([100000, 100000000]);
  const [value2, setValue2] = React.useState([100000, 100000000]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    checkin: null,
    checkout: null,
    address: null,
    bathrooms: null,
    bedrooms: null,
  });

  const navigate = useNavigate();

  const handleSearch = async () => {
    let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/homes`, {
      params: {
        checkin: dataFilter.checkin || '',
        checkout: dataFilter.checkout || '',
        address: dataFilter.address || '',
        bathrooms: dataFilter.bathrooms || '',
        bedrooms: dataFilter.bedrooms || '',
        minPrice: value2[0] || '',
        maxPrice: value2[1] || '',
      },
    });
    navigate('/', { state: { data: response.data } });
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  const handleChange = (ev) => {
    if (ev.value[0] || ev.value[1]) {
      setDataFilter({
        ...dataFilter,
        checkin: format(new Date(ev.value[0]), 'yyyy-MM-dd'),
        checkout: format(new Date(ev.value[1]), 'yyyy-MM-dd'),
      });
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInput = (e, keyword) => {
    const value = e.target.value;
    setDataFilter({
      ...dataFilter,
      [keyword]: value,
    });
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          float: 'left',
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'center',
          textAlign: 'center',
          height: '80%',
        }}
      >
        <div>
          <Button
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              cursor: 'pointer',
              float: 'left',
              color: 'black',
              height: '100%',
              borderRadius: 35,
              width: '300%',
              left: '-55px',
            }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <SearchIcon /> Search
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <div
              className="search-bar-list"
              id="search-bar-list"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <MenuItem>
                <TextField
                  onChange={(e) => handleInput(e, 'address')}
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  defaultValue={dataFilter.address}
                />
              </MenuItem>
              <MenuItem>
                <TextField
                  onChange={(e) => handleInput(e, 'bedrooms')}
                  type="number"
                  id="standard-basic"
                  label="Bedrooms"
                  variant="standard"
                  defaultValue={dataFilter.bedrooms}
                />
              </MenuItem>
              <MenuItem>
                <TextField
                  onChange={(e) => handleInput(e, 'bathrooms')}
                  type="number"
                  id="standard-basic"
                  label="Bathrooms"
                  variant="standard"
                  defaultValue={dataFilter.bathrooms}
                />
              </MenuItem>
              <div
                onClick={(event) => event.stopPropagation()}
                className={`calendar-range ${openDate ? '' : 'hidden'}`}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Datepicker
                  placeholder="choose date"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  select="range"
                  themeVariant="light"
                  theme="ios"
                  dateFormat="DD-MM-YYYY"
                  min={Date.now() + 24 * 60 * 60 * 1000}
                  maxRange={100}
                  onChange={handleChange}
                  controls={['calendar']}
                  touchUi={false}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ width: 300, display: 'flex', alignItems: 'center' }}>
                <Slider
                  id="price-slider"
                  sx={{ width: '300px' }}
                  min={100000}
                  max={10000000}
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={value2}
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                  valueLabelFormat={(value) => (
                    <div>đ {value.toLocaleString('en-EN')}</div>
                  )}
                />
              </Box>
              <MenuItem
                style={{
                  color: '#f7a800',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={handleSearch}
              >
                Apply
              </MenuItem>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
