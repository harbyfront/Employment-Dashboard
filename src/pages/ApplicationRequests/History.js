import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";


const History = () => {
    const [requests, setrequests] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:4000/requests')
        .then(response => setrequests(response.data))
        .catch(error => console.log(error));
    }, []);
  
    
    
  
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
              <th>state_request
                 (0=>decline, 1=>accept)</th>
              <th></th>
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
                <td>{request.state_request}</td>
               
                
              </tr>
            ))}
          </tbody>
          </Table>
      </div>
    );
  };
  
  export default History;
  