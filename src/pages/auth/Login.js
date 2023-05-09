import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/Login.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";



// form.group have form label and form input 
const Login=() =>{

    const navigate = useNavigate();

    const [login, setLogin] = useState({

        email:"",
        password:"",
        loading:false,
        err:[],
    });


const LoginFun=(e)=>{

    e.preventDefault();
    setLogin({...login, loading:true,err:[]})
    axios
    .post("http://localhost:4000/auth/login",{
        email:login.email,
        password:login.password,        // دول كدا بيروحوا للباك عشان يعمل check عليهم 
    })
    .then(resp => {

        setLogin({...login, loading:false,err:[]});
        setAuthUser(resp.data);
        navigate("/");
        
        })


    
    .catch((errors)=>{

        setLogin({...login, loading:false,err:errors.response.data.errors,});


    });

};


    return (
        <div className='login-container'>
            <h1>Login Form</h1>
            
            {login.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
            
            <Form onSubmit={LoginFun}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" required placeholder="Please Enter email" value={login.email}  onChange={(e)=>setLogin({...login,email: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" required placeholder="Please Password" value={login.password} onChange={(e)=>setLogin({...login,password: e.target.value})} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={login.loading===true}>
                    Login
                </Button>
            </Form>



        </div>
    );
}

export default Login;