import React, { useState, useEffect } from 'react';

const FloorTable = ({ projects, floorNo }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [beforeInspectionData, setBeforeInspectionData] = useState();
  const [assignedInspection, setAssignedInspection] = useState();

  const handleSelectProject = (project) => {
    setSelectedProjects((prevSelected) => {
      if (prevSelected.includes(project.InventoryID)) {
        return prevSelected.filter(id => id !== project.InventoryID); 
      }
      return [...prevSelected, project.InventoryID]; 
    });
  };

  const handleAssignChecklist = async () => {
    if (selectedProjects.length > 0) {
      const payload = { InventoryIDs: selectedProjects.join(',') };

      try {
        const response = await fetch('https://oro24world.com/api/HandOverProjectDelivery/work-activity-items-by-unit-multiple/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data,'beforeInspectionData')
        setBeforeInspectionData(data); 
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error calling API:', error);
      }
    }
  };


  useEffect(() => {
    if (beforeInspectionData) {
      const addInspectionSpace = async () => {
        try {
            console.log('is it getting called',selectedProjects)
          const dataToSend = [
            {
              InventoryID: selectedProjects[0], 
              Spaces: beforeInspectionData, 
            },
          ];
 
          const response = await fetch('https://oro24world.com/api/HandOverProjectDelivery/add-inspection-space', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(dataToSend), 
          });
  
          const data = await response.json();
          setAssignedInspection(data); 
          if(data[0]?.Message === 'Successfull'){
            setTimeout(()=>{
                alert('Success')
            },2000)
         
          }
          console.log('Assigned Inspection Response:', data);
        } catch (error) {
          console.error('Error calling add-inspection-space API:', error);
        }
      };
  
      addInspectionSpace();
    }
  }, [beforeInspectionData]);
  

  return (
    <div className='mt-4'>
      <h2 className='font-bold text-center text-[32px] text-black'>{floorNo}</h2>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {!beforeInspectionData && projects?.length > 0 && projects.map((project, index) => (
          <div
            key={index}
            className={`floor-box py-3 px-2 border w-[20%] cursor-pointer h-[60px] border-black rounded-[3px] flex items-center justify-between 
              ${selectedProjects.includes(project.InventoryID) ? 'selected-project' : ''}`}
            style={{
              boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.12)',
            }}
            onClick={() => handleSelectProject(project)}
          >
            <span className="text-lg font-bold pr-4 border-r-2 border-black">{project.ApartmentType}</span>
            <span className="text-sm">{project.UnitNo}</span>
          </div>
        ))}
      </div>

      {
        !beforeInspectionData && 
        <div className='bg-selection text-check fixed bottom-0 h-[15vh] w-full text-center flex items-center justify-center'>
          You selected <span className='font-bold text-[20px]'> &nbsp; {selectedProjects.length} units</span>
          <button 
            className='btn-gold w-[202px] h-[52px] text-white font-bold rounded-[8px] ml-3 text-[15px]' 
            onClick={handleAssignChecklist}
          >
            Assign Check list
          </button>
        </div>
      }

    
      {assignedInspection && (
        <div className="assigned-inspection-data">
     
        
        </div>
      )}
    </div>
  );
};

export default FloorTable;
