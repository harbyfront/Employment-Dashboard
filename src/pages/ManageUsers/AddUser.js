import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";  
import"../../css/Add.css";


const User = () => {
const [applicant, setapplicant] = useState([]);
const [email, setemail] = useState('');
const [name, setname] = useState('');
const [phone, setphone] = useState('');
const [password, setpassword] = useState('');

// ...
const addapplicant = async (email, password,name,phone) => {
   await fetch('http://localhost:4000/applicant', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone:phone,
        // userId: Math.random().toString(36).slice(2),
      }),
      headers: {
         'Content-Type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         setapplicant((applicant) => [data, ...applicant]);
         setemail('');
         setpassword('');
         setphone('');
         setname('');
      })
      .catch((err) => {
         console.log(err.message);
      });
};

const handleSubmit = (e) => {
   e.preventDefault();
   addapplicant(email, password,name,phone);
};    

return (
   <div className="form-control">
      
      <div id="feedback-form">
     
      <h2 class="header">Add user</h2>
      <div className="add-post-container" >
         <form className="mb-3" controlId="exampleForm.ControlInput1" onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <input type="email" className="mb-3"  value={email} placeholder="email"
               onChange={(e) => setemail(e.target.value)}
            />
             </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <input type="text" className="mb-3"  value={name} placeholder="name"
               onChange={(e) => setname(e.target.value)}
            />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <input type="passowrd" className="mb-3"  value={password} placeholder="passowrd"
               onChange={(e) => setpassword(e.target.value)}
            />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <input type="int" className="mb-3" value={phone} id="feedback-phone"   placeholder="phone"
               onChange={(e) => setphone(e.target.value)}
            />
            </Form.Group>
            <button type="submit">submit</button>
       
         </form>

         </div>
      </div>
      </div>
);
};

export default User;