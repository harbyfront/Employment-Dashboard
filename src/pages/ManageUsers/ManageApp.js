import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
//import "../../css/ManageMovies.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";


const Manageapp = () => {
  const auth = getAuthUser();
  const [app, setapp] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setapp({ ...app, loading: true });
    axios
      .get("http://localhost:4000/applicant")
      .then((resp) => {
        setapp({ ...app, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setapp({
          ...app,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [app.reload]);

  const deleteapp = (id) => {
    axios
      .delete("http://localhost:4000/applicant/" + id, )
      .then((resp) => {
        setapp({ ...app, reload: app.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Applicant</h3>
        
      <Link to={"add"}><button className="btn btn-success">Add New Applicant +</button></Link>
        
      
   
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th> password</th>
            <th> phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {app.results.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td> {app.Email} </td>
              <td>{app.passowrd}</td>
              <td>{app.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteapp(app.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"update"}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Manageapp;
