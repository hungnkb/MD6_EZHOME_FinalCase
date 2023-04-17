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

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
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
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <div
        style={{
          width: '800px',
          height: '300px',
          border: '2px solid gray',
        }}
      >
        {images?.map((image, i) => (
          <img
            style={{ width: 170, height: 140 }}
            key={i}
            src={URL.createObjectURL(image)}
          />
        ))}
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
