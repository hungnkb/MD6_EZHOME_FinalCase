import React, { useEffect, useState } from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import "./style.css"
export default function DetailDashboard() {
  const idHome = useParams();
  const [dashboard, setDashboard] = useState([]);
  const[image,setImage]= useState([])
  useEffect(()=>{
    const getData = async () => {
   axios.get(`http://localhost:3002/api/v1/homes?idHome=${idHome.id}`)
   .then((res)=>{
    setDashboard(res.data[0])
    setImage(res.data[0].images)
   })
  };
  getData();
  },[])
  console.log(image,22);
  console.log(dashboard);
  return (
    <>
    <div className='container' style={{marginTop:"3%"}}>
      <div className='row'>
        <div className='col-4'>
           <h3> {dashboard.title}</h3>
          <br/>
          <h5><Button variant='light' className="no-hover"><b> Details of the house for rent</b>  </Button> </h5>
          <br/> 
        </div>
        <div className='col-8'>
          <div>
           <div className='row'>
            <div className='col-10'>
              <h5>Image</h5>
            </div>
            <div className='col-2'> <Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='container'>
                {/* { image.map((image,index)=>{ */}
                  <img style={{width:"30%"}} src={image[0]?.urlHomeImage} alt="image"/>

                   {/* })}  */}
              </div>

            </div>
          </div>

          </div>
          <hr/>
          <br/>
          <h5>Basic information about rental houses</h5>
          <br/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Title of the house for rent </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"gray"}}> {dashboard.title}</p>  

            </div>
          </div>

          </div>
          <hr/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Category of the house for rent </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"green"}}> {dashboard?.idCategory?.categoryName}</p>  

            </div>
          </div>

          </div>
          <hr/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Price of the house for rent </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"red"}}> {dashboard?.price?.toLocaleString('en-EN')}đ/night</p>  

            </div>
          </div>

          </div>
          <hr/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Location</p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"gray"}}> {dashboard?.address}</p>  

            </div>
          </div>

          </div>
          <hr/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Bedrooms and bathrooms </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"gray"}}> Bedrooms: {dashboard?.bedrooms}</p>  
            <p style={{color:"gray"}}> Bathrooms: {dashboard?.bathrooms}</p>  

            </div>
          </div>

          </div>
          <hr/>
          <div>
           <div className='row'>
            <div className='col-10'>
              <p>Description of the house for rent </p>
            </div>
            <div className='col-2'><Button variant='light'>  <b><u> Edit </u></b> </Button></div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <p style={{color:"gray"}}>{ReactHtmlParser( dashboard?.description)}</p>  
            </div>
          </div>

          </div>
          
          
        
        </div>

      </div>

  
 
    </div>
    </>
  );
}
