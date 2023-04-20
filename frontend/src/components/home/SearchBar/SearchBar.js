import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './style.css';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import SearchAddress from './SearchAddress';
import SearchBathrooms from './SearchBathrooms';
import SearchBedrooms from './SearchBedrooms';
import SearchCheckin from './SearchCheckin';
import SearchCheckout from './SearchCheckout';
import { format } from 'date-fns';
import { Datepicker, Input, localeVi } from '@mobiscroll/react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const searchList = ['Address', 'Checkin', 'Checkout', 'Bedrooms', 'Bathrooms']

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
    const [data, setData] = useState({
        checkin: null,
        checkout: null,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [address, setAddress] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [homeList, setHomeList] = useState([]);

    const navigate = useNavigate();

    const handleSearch = async () => {
        console.log(address, bathrooms,bedrooms,data.checkin, data.checkout);
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/homes?address=${address}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&checkin=${data.checkin}&checkout=${data.checkout}`);
        setAddress('');
        setBathrooms('');
        setBedrooms('');
        setData({
            checkin: null,
            checkout: null,
        });
        console.log(response.data);
        navigate('/', {state: {data: response.data}});
    }

    const getBookings = (date, callback) => {
        const invalid = [];
        const labels = [];
    };

    const onPageLoadingMultiple = useCallback((event) => {
        getBookings(event.firstDay, (bookings) => {
            const dateNow = new Date()
            setMultipleInvalid([bookings.invalid]);
        });
    }, []);

    const handleChange = useCallback((ev) => {
        if (ev.value[0] && ev.value[1]) {
            setDate([ev.value[0], ev.value[1]]);
            setData({
                ...data,
                checkin: format(new Date(ev.value[0]), 'yyyy-MM-dd'),
                checkout: format(new Date(ev.value[1]), 'yyyy-MM-dd'),
            });
        }

    }, []);

    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInput = (e, keyword) => {
        const value = e.target.value
        if (keyword === 'address') {
            setAddress(value)
        } else if (keyword === 'bedrooms') {
            setBedrooms(value)
        } else {
            setBathrooms(value)
        }
    }

    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
            <div style={{ float: 'left', display: 'flex', flexDirection: 'row', textAlign: 'center', textAlign: 'center', height: '80%' }}>
                <div>
                    <Button
                        style={{
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            cursor: 'pointer',
                            float: 'left',
                            color: 'black',
                            height: '100%',
                            borderRadius: 35,
                            width: '300%'
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
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <MenuItem>
                                <TextField onChange={e => handleInput(e, 'address')} id="standard-basic" label="Address" variant="standard" />
                            </MenuItem>
                            <MenuItem>
                                <TextField onChange={e => handleInput(e, 'bedrooms')} type='number' id="standard-basic" label="Bedrooms" variant="standard" />
                            </MenuItem>
                            <MenuItem>
                                <TextField onChange={e => handleInput(e, 'bathrooms')} type='number' id="standard-basic" label="Bathrooms" variant="standard" />
                            </MenuItem>
                            <div
                                onClick={(event) => event.stopPropagation()}
                                className={`calendar-range ${openDate ? '' : 'hidden'}`}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Datepicker
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    select="range"
                                    themeVariant='light'
                                    theme='ios'
                                    dateFormat="DD-MM-YYYY"
                                    min={Date.now() + 24 * 60 * 60 * 1000}
                                    maxRange={100}
                                    onChange={handleChange}
                                    controls={['calendar']}
                                    touchUi={false}
                                />
                            </div>
                            <MenuItem style={{ color: '#f7a800' }} onClick={handleSearch} >Apply</MenuItem>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>

    )
}




export default SearchBar