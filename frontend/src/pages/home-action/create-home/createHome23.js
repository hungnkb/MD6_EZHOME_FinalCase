import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { setFiles } from '../../../redux/features/homeSlice';
import ImageUploading from "react-images-uploading";
import './style.css';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateHome23() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.createHome);
  const [check, setCheck] = useState(false);
  const currentAuth = useSelector(state => state.auth);
  const maxNumber = 5;

  useEffect(() => {
    if (!currentAuth.isLogined) {
      navigate('/')
    }
  }, [])

  const onImageRemoveAll = () => {
    setImages([]);
    dispatch(setFiles([]));
  }

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList);
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  }

  useEffect(() => {
    if (images.length > 0) {
      dispatch(setFiles(images));
      setCheck(true);
    } else if (currentState.files?.length > 0) {
      setImages(currentState.files);
    }
  }, [images]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1 style={{ marginTop: '5px' }}>Make your home more beautiful </h1>
        </div>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "png", "webp"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                variant="outlined"
                style={isDragging ? { color: "red", marginRight: '10px' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </Button>
              &nbsp;
              <Button variant="outlined" color="error" onClick={onImageRemoveAll}>Remove all images</Button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button sx={{marginRight: '10px'}} variant="outlined" onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button variant="outlined" color="error" onClick={() => onImageRemove(index)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <div className="row" id="btn-create">
        <div className="col-12">
          <Button
            id="btn-back"
            onClick={() => navigate('/create-home/2')}
            variant="contained"
          >
            Back
          </Button>
          {check ? (
            <Button
              id="btn-next1"
              onClick={() => navigate('/create-home/4')}
              variant="contained"
            >
              Next
            </Button>
          ) : (
            <Button id="btn-next2" Button variant="contained" type="button">
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
