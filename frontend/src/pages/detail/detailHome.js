import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ContentHome from "./contentHome";
import {useParams} from "react-router-dom";

export default function DetailHome() {
    const idHome = useParams();

    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4> HOIAN, 2BEDS, king beds, free bike </h4>
                            54 reviews
                            Hoi An City, Quảng Nam, Vietnam
                        </div>

                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <img style={{width: 500}}
                                 src="https://a0.muscache.com/im/pictures/miso/Hosting-9738315/original/822ef891-8fb6-4695-a31c-485ab7c2ee21.jpeg?im_w=960"/>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <img style={{width:250}}
                                        src="https://a0.muscache.com/im/pictures/miso/Hosting-9738315/original/a6a87b0d-8854-4631-8797-444f1069f7df.jpeg?im_w=720"/>
                                </div>
                                <div className="col-6">
                                    <img style={{width:250}} src="https://a0.muscache.com/im/pictures/a0cb7a6b-06d1-4fad-b856-8bc9e7d5c46c.jpg?im_w=720"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <img style={{width:250}} src="https://a0.muscache.com/im/pictures/ff87818d-b407-43dc-b205-79ab0f965ada.jpg?im_w=720"/>
                                </div>
                                <div className="col-6">
                                    <img style={{width:250}} src="https://a0.muscache.com/im/pictures/395c1775-d06e-4d84-900e-4cce999bf237.jpg?im_w=720"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr/>
                   <div className="row">
                       <div className="col-7">
                           <h3>Where you'll sleep</h3>
                           <hr/>
                           <ContentHome/>
                       </div>
                       <div className="col-5" style={{marginTop:"65px"}}>
                           <ContentHome/>
                       </div>
                   </div>
                </div>

            </div>
        </>
    )
}