import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
//import "../../css/ManageMovies.css";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { Link } from "react-router-dom";


const ManageJob = () => {
  const auth = getAuthUser();
  const [jobs, setJobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setJobs({ ...jobs, loading: true });
    axios
      .get("http://localhost:4000/jobs")
      .then((resp) => {
        setJobs({ ...jobs, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setJobs({
          ...jobs,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [jobs.reload]);

  const deleteJob = (id) => {
    axios
      .delete("http://localhost:4000/jobs/" + id, )
      .then((resp) => {
        setJobs({ ...jobs, reload: jobs.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage job</h3>
        <Link to={"add"} className="btn btn-success">
          Add New job +
        </Link>
      
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
            <th>position</th>
            <th> Description</th>
            <th> offer</th>
            <th> max_candidate_number</th>
            <th> Qualifications</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.results.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td> {job.position} </td>
              <td>{job.description}</td>
              <td>{job.offer}</td>
              <td>{job.max_candidate_number}</td>
              <td>{job.qualifications}</td>
              <td>
              <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteJob(job.id);
                  }}>
                  Delete
                </button>
                
                <Link to={"update"} className="btn btn-sm btn-primary mx-2">
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

export default ManageJob;
