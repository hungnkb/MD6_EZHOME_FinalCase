import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {setCategory} from '../../../redux/features/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import Card from 'react-bootstrap/Card';
import BedIcon from '@mui/icons-material/Bed';
import * as React from 'react';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import './style.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CreateHome21() {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentState = useSelector((state) => state.createHome);
    const currentAuth = useSelector(state => state.auth);

    const categoryList = [
        {idCategory: 1, categoryName: "Presidential",icon:`fa-regular fa-bed`},
        {idCategory: 2, categoryName: "Single", icon: 'fa-regular fa-bed'},
        {idCategory: 3, categoryName: "Pair",icon: 'fa-regular fa-bed'},
        {idCategory: 4, categoryName: "Vip",icon: 'fa-regular fa-bed'},
        {idCategory: 5, categoryName: "Luxury",icon:'fa-regular fa-bed'}]

    useEffect(() => {
        if (!currentAuth.isLogined) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        if (currentState.idCategory) {
            setCheck(true);
            document.querySelector(`#category-${currentState.idCategory}`).checked = true;
        }
    }, [currentState.idCategory]);

    const handleCategory = (e) => {
        dispatch(setCategory(e.target.value));
        setCheck(true);
    }

    return (
        <>
            <center>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Which of these best describes your place?</h2>
                        </div>
                    </div>
                    <div className="row">
                        {categoryList.map((values,index)=>(
                            <div>
                                <div className="col-6">
                                    <center>
                                        <Card.Body>
                                            <Card className="card-createHome">
                                                <center>
                                                    <input onChange={(e)=>handleCategory(e)} id={`category-${values.idCategory}`} type="radio" name="category" className='category-input' value={values.idCategory}/>
                                                    <label htmlFor={`category-${values.idCategory}`} className="category-item">
                                                        {/*<Button*/}
                                                        {/*    id="btn"*/}
                                                        {/*    onClick={() => {*/}
                                                        {/*        dispatch(setCategory(1));*/}
                                                        {/*        setCheck(true);*/}
                                                        {/*    }}*/}
                                                        {/*>*/}
                                                        <b> <i className={values.icon}></i> {values.categoryName}</b>{' '}
                                                        {/*</Button>*/}
                                                    </label>

                                                </center>
                                            </Card>
                                        </Card.Body>
                                    </center>
                                </div>
                            </div>

                        ))}

                    </div>

                    <div className="footer-end">
                        <ProgressBar variant="dark" now={25}/>
                        <br/>
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    style={{background: 'gray'}}
                                    onClick={() => navigate('/create-home')}
                                    variant="contained"
                                >
                                    Back
                                </Button>
                                {check ? (
                                    <Button
                                        style={{
                                            background: '#f7a800',
                                            marginLeft: '85%',
                                        }}
                                        onClick={() => navigate('/create-home/2')}
                                        variant="contained"
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        style={{
                                            background: 'gray',
                                            marginLeft: '85%',
                                        }}
                                        variant="contained"
                                        type="button"
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </center>

        </>
    );
}
