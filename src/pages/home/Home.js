
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Jops from '../../components/Jops';



function Home() {
  const [user_id, setuser_id] = useState('');
  const [Keyword, setKeyword] = useState('');
  const [jop, setJop] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/jobs');
        console.log('Jobs retrieved successfully:', response.data);
        setJop(response.data);
      } catch (error) {
        console.error('Error retrieving jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/history', {  Keyword});
      console.log('Search saved successfully:', response.data);
     
      setKeyword('');
    } catch (error) {
      console.error('Error saving search:', error);
      
    }
  };

  // Load search history on mount and when userId changes
  useEffect(() => {
    const fetchSearches = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/auth/history`);
          console.log('Search history retrieved successfully:', response.data);
          if (Array.isArray(response.data)) {
            setHistory(response.data);
          } else {
            setHistory([]);
          }
        } catch (error) {
          console.error('Error retrieving search history:', error);
        }
      };
    fetchSearches(); // call fetchSearches here to load search history
  }, [user_id]); 

  // Filter jobs by keyword
  const filteredJobs = jop.filter((jop) => jop.position.toLowerCase().includes(Keyword.toLowerCase()));
  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
  }
  
  return (
    <div>
      <form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex p-3 " style={{marginTop:"1%"}}>
        <label>

        <input type="text" value={Keyword} onChange={(e) => setKeyword(e.target.value)}  onClick={handleHistoryClick} />
          {showHistory && (
          <div className='absolute mt-1 w-full p-2 bg-white shadow-lg rouneded-bl rounded-br max-h-36 overflow-y-auto'>
            <ul>
              {history.map(result => (
                <li key={result.id}>{result.Keyword}</li>
              ))}
            </ul>
          </div>
        )}
        </label>
        <button type="submit" >Search</button>
        </Form.Group>
      </form>
      
      <ul>
        {filteredJobs.map((jop) => (
          <div className='col-12 card-jop-container py-3' >
        < Jops  key={jop.id} position={jop.position} description={jop.description} max candidate number={jop.max_candidate_number } qualifications={jop.qualifications} offer={jop.offer} id={jop.id} /> 
                    
          </div>
        ))}
      </ul>
      
      
    </div>
  );
}

export default Home;
