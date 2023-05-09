import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";

const AdminDashboard = () => {
  const [requests, setrequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/requests')
      .then(response => setrequests(response.data))
      .catch(error => console.log(error));
  }, []);

  
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/requests/accept/${id}`, { state_request: '1' });
      console.log(response.data); 
    } catch (error) {
      console.error(error); 
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/requests/decline/${id}`, { state_request: '0' });
      console.log(response.data); 
    } catch (error) {
      console.error(error); 
    }
  
  };

  return (
   
    <div>
         <h1>Admin Dashboard</h1>
    <Table striped bordered hover>
     
     
        <thead>
          <tr>
          <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>job_position</th>
            <th>user_qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
               <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.job_position}</td>
              <td>{request.user_qualification}</td>
             
              <td>
                
                  <>
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => handleApprove(request.id)}>Approve</button>
                    <button  className="btn btn-sm btn-danger" onClick={() => handleDecline(request.id)}>Decline</button>
                  </>
                
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  );
};

export default AdminDashboard;
