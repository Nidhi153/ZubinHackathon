import React from "react";
import Box from '@mui/material/Box';

import EventData from "../data/event.json";

const buttonStyle = {
  backgroundColor: '#F0F0F0',
  border: '2px solid #000000',
  borderRadius: '25px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px'
};

const registeredEventStyle = {
    backgroundColor: '#F0F0F0',
    border: '1px solid #ccc',
    padding: '5px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px'
  };

const titleStyle = {
  fontSize: '40px'
};

const registerStyle = {
    paddingTop: '15px',
    fontSize: '25px'
  };

const dateStyle = {
  fontSize: '14px'
};

const arrowStyle = {
  fontSize: '30px'
};



const EventPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px', marginLeft: '5%', marginRight: '5%'}}>
      <div style={{ width: '60%', borderRadius: '5px', padding: '10px' }}>
        {EventData.map((item, index) => (
        <div style={buttonStyle} key={index}>
          <Box
            height={100}
            width={800}
            my={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
          >
            <div>
              <div className="text-center font-textfont font-bold" style={titleStyle}>
                {item.EventName}
              </div>
              <div style={dateStyle}>
                {item.Date}
              </div>
              <div style={dateStyle}>
                {item.Subtitle}
              </div>
            </div>
            <div style={arrowStyle}>{'>'}</div>
          </Box>
        </div>
      ))}
      </div>


      
      <div style={{ width: '35%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        <h2 style={registerStyle} className="text-center">Registered Events</h2>
        {EventData.map((item, index) => (
          <div style={registeredEventStyle} key={index}>
            <Box
              my={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
            >
              <div>
                <div className="text-center font-textfont font-bold" style={titleStyle}>
                  {item.EventName}
                </div>
                <div style={dateStyle}>
                  {item.Date}
                </div>
              </div>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
