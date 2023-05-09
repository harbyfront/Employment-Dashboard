import React from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "../css/Jops.css";


const Jops = (props) => {
    return (
        <div>
            <Card > 
      
      <Card.Body>
        <Card.Title>{props.position }</Card.Title>
        <Card.Text>
          
        {props.description }
        <br/> 
        {props.max_candidate_number}
        qualifications : {props.qualifications}
        <br/>
        {"sallery:"+props.offer }
        </Card.Text>
        <Link className='btn btn-dark ' to={"/"+props.id}>Apply Now </Link>
        
      </Card.Body>
    </Card>
        </div>
    );
};

export default Jops;