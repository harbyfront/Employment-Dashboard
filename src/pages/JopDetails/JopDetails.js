import React ,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../css/JopDetails.css";
import axios from 'axios';
import { setAuthUser } from "../../helper/Storage";  /// شيلها ؟ 
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

/* row have 12 columns */
const JopDetails = () => {

    const navigate = useNavigate();

    const [apply, setApply] = useState({

        name:"",
        email:"",
        phone:"",
        job_position:"",
        user_qualification:"",
        loading:false,
        err:[],
    });


    const ApplyFun=(e)=>{

        e.preventDefault();
        setApply({...apply, loading:true,err:[]})
        axios
        .post("http://localhost:4000/requests",{
            name:apply.name,
            email:apply.email,        // دول كدا بيروحوا للباك عشان يعمل check عليهم 
            phone:apply.phone,
            job_position:apply.job_position,
            user_qualification:apply.user_qualification,
        })
        .then(resp => {
    
            setApply({...apply, loading:false,err:[]});
            console.log(resp); 
            navigate("/"); 
            
            // here navigate 
            
            })
    
    
        
        .catch(errors=>{
    
            setApply({...apply, loading:false,err:errors.response.data.errors});
    
    
        });
    
    };










    return (
<div className='apply-container'>

<h1>Apply Jop</h1>


            
            <Form onSubmit={ApplyFun} >
            <Form.Group className="mb-3"  >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" required placeholder="Please Enter Name" value={apply.name} onChange={(e) => setApply({ ...apply, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3"  >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" required  placeholder="Please Enter Email" value={apply.email} onChange={(e) =>
              setApply({ ...apply, email: e.target.value })
            } />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="password" required  placeholder="Please Enter Phone" value={apply.phone} onChange={(e) =>
              setApply({ ...apply, phone: e.target.value })
            } />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>job_position:</Form.Label>
                    <Form.Control type="text" required  placeholder="Please Enter The job_position You Want To Apply" value={apply.job_position} onChange={(e) =>
              setApply({ ...apply, job_position: e.target.value })
            }  />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>qualifications:</Form.Label>
                    <Form.Control className='user_qualification' type="text" required  placeholder="Please Enter Your qualifications For This Jop" value={apply.user_qualification} onChange={(e) =>
              setApply({ ...apply, user_qualification: e.target.value })
            } />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Apply
                </Button>
            </Form>

        </div>
    );
};

export default JopDetails;