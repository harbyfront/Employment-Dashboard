
import React, { useState, useEffect } from 'react';
//import '../../css/Add.css';
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import {Link} from "react-router-dom";
const UpdateJo = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    position: '',
    max_candidate_number: '',
    qualifications: '',
    offer: '',
    description: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/jobs/4`)
      .then(response => {
        setJob(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:4000/jobs/4`, job)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <h1>Update job Form</h1>

      {job.err && (
        <Alert variant="danger" className="p-2">
          {job.err}
        </Alert>
      )}

      {job.success && (
        <Alert variant="success" className="p-2">
          {job.success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="text-center py-2">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="position"
            placeholder="Job position"
            value={job.position}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={job.description}
            onChange={handleChange}
            rows={5}
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="offer"
            placeholder="Offer"
            value={job.offer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="max_candidate_number"
            placeholder="Job max_candidate_number"
            value={job.max_candidate_number}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="qualifications"
            placeholder="Job qualifications"
            value={job.qualifications}
            onChange={handleChange}
          />    
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          <Link to={"/manage-jops"}>Update job</Link>
        </Button>
      </Form>
    </div>
  );
};

export default UpdateJo;