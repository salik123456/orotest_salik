import React, { useState, useEffect } from 'react';
import FloorTable from './FloorTable';

const Dashboard = () => {

  const [data, setData] = useState(null);

  const [error, setError] = useState(null); 

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch('https://oro24world.com/api/HandOverProjectDelivery/inventory/floor-inventory-byBlock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': 'KYCTY', 
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          },
          body: JSON.stringify({
            ProjectID: 1,
            apt_type: 'All',
            block: 'All',
            ProjectDeliveryStatusID: 1
          }),
        });

 
        if (response.ok) {
          const result = await response.json();
          console.log(result,'the result main')
          console.log(result[0],'my result is this')
          setData(result[0]); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message); 
      } 
    };

    fetchData(); 
  }, []); 


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     


      <FloorTable projects={data?.ProjectDeliveries} floorNo={data?.floor_no}/>
   
    
    </div>
  );
};

export default Dashboard;
