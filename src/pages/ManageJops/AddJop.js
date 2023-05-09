import React, { useState, useEffect } from 'react';
import '../../css/Add.css';
const Job = () => {
const [job, setjob] = useState([]);
const [position, setposition] = useState('');
const [max_candidate_number, setmax_candidate_number] = useState('');
const [qualifications, setqualifications] = useState('');
const [offer, setoffer] = useState('');
const [description, setdescription] = useState('');
// ...
const createjob = async (position, max_candidate_number,qualifications,offer,description) => {
   await fetch('http://localhost:4000/jobs', {
      method: 'POST',
      body: JSON.stringify({
     position:position, 
        max_candidate_number:max_candidate_number,
        qualifications:qualifications,
        offer:offer,
        description:description,
        // userId: Math.random().toString(36).slice(2),
      }),
      headers: {
         'Content-Type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         setjob((job) => [data, ...job]);
         setposition('');
         setmax_candidate_number('');
         setqualifications('');
         setoffer('');
         setdescription('');
      })
      .catch((err) => {
         console.log(err.message);
      });
};

const handleSubmit = (e) => {
   e.preventDefault();
   createjob(position, max_candidate_number,qualifications,offer,description);
};    

return (
   <div className="form-control">
    
      <div id="feedback-form">
      
         <form onSubmit={handleSubmit}>
         <h1>Add job</h1>
            <input type="text" className="mb-3"  value={position} placeholder="position"
               onChange={(e) => setposition(e.target.value)}
            />
            <input type="text" className="mb-3"  value={max_candidate_number} placeholder="max_candidate_number"
               onChange={(e) => setmax_candidate_number(e.target.value)}
            />
            <input type="text" className="mb-3"  value={qualifications} placeholder="qualifications"
               onChange={(e) => setqualifications(e.target.value)}
            />
            <input type="varchar" className="mb-3" value={offer}  placeholder="offer"
               onChange={(e) => setoffer(e.target.value)}
            />
            <input type="text" className="mb-3" value={description}  placeholder="description"
               onChange={(e) => setdescription(e.target.value)}
            />
            <button type="submit">Add job</button>
         </form>
      </div>
      {/* ... */}
   </div>
);
};

export default Job;