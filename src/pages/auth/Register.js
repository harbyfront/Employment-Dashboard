import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../css/Register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setAuthUser } from "../../helper/Storage";

const Register = () => {

    const navigate = useNavigate();

    const [register, setRegister] = useState({

        email:"",
        password:"",
        name:"",
        phone:"",
        loading:false,
        err:[],
    });


const RegisterFun=(e)=>{

    e.preventDefault();
    setRegister({...register, loading:true,err:[]})
    axios
    .post("http://localhost:4000/auth/register",{
        email:register.email,
        password:register.password,        // دول كدا بيروحوا للباك عشان يعمل check عليهم 
        name:register.name,
        phone:register.phone
    })
    .then(resp => {

        setRegister({...register, loading:false,err:[]});
        setAuthUser(resp.data);
        navigate("/");
        
        })


    
    .catch(errors=>{

        setRegister({...register, loading:false,err:errors.response.data.errors});


    });

};





    return (
        <div className='register-container'>

<h1>Registration  Form</h1>

{register.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
            
            <Form onSubmit={RegisterFun}>
            <Form.Group className="mb-3"  >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" required placeholder="Please Enter Name"  value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3"  >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" required  placeholder="Please Enter Email" value={register.email} onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            } />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" required  placeholder="Please Enter Password" value={register.password} onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="text" required  placeholder="Please Enter Your Number"  value={register.phone} onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }/>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={register.loading === true}>
                    register
                </Button>
            </Form>

        </div>
    );
};

export default Register;