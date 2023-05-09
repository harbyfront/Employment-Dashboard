import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Update_app = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [app, setapp] = useState({
    email: "",
    password: "",
    phone:"",
    name:"",
    err: "",
    loading: false,
    success: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/applicant/1`)
      .then(response => {
        setapp(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    setapp({ ...app, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:4000/applicant/1`, app)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  
  };
  
 
  return (
    <div className="login-container">
      <h1>Update Applicant Form</h1>

      {app.err && (
        <Alert variant="danger" className="p-2">
          {app.err}
        </Alert>
      )}

      {app.success && (
        <Alert variant="success" className="p-2">
          {app.success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="text-center py-2">
        
        

        <Form.Group className="mb-3">
          <Form.Control
            type="varchar"
            placeholder="email"
            value={app.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Passowrd"
            type="varchar"
            value={app.password}
            name="password"
            onChange={handleChange}
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            //type="number"
            placeholder="phone"
            value={app.phone}
            name="phone"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            //type="number"
            placeholder="name"
            value={app.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
         <Link to={"manage-app"}>Update Applicant</Link> 
        </Button>
      </Form>
    </div>
  );
};

export default Update_app ;
