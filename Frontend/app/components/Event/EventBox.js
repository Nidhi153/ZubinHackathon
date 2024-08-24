import { Card } from "flowbite-react";
import "./Event.css";
import Box from '@mui/material/Box';

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

const titleStyle = {
  fontSize: '40px'
};

const dateStyle = {
  fontSize: '14px'
};

const arrowStyle = {
  fontSize: '30px'
};

export default function EventBox({ event }) {
  return (
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
          {event.title}
        </div>
        <div style={dateStyle}>
          {event.date}
        </div>
        <div style={dateStyle}>
          {event.description}
        </div>
      </div>
      <div style={arrowStyle}>{'>'}</div>
    </Box>
  </div>


    // <div className="event-box">
    //   <Card>
    //     <h2>{event.title}</h2>
    //     <hr />
    //     <p>{event.description}</p>
    //     <p>Event date: {event.date}</p>
    //   </Card>
    // </div>
  );
}
