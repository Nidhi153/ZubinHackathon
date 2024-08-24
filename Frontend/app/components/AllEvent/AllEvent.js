import React from "react";
// import Box from '@mui/material/Box';
import { Card } from "flowbite-react";
import { Box } from '@chakra-ui/react'

import EventData from "../../data/event.json"
import Event from "../Event/AllEvent"
import RegisteredEvent from "../Event/RegisteredEvent"

const registerStyle = {
    fontSize: '25px'
  };

const EventPage = ({setUserId}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px', marginLeft: '5%', marginRight: '5%'}}>
      <br></br>
      <div style={{ width: '60%', borderRadius: '5px', padding: '10px' }}>
        <Event />
      </div>
      <div style={{ width: '40%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', transform: 'translate(35%, 3%)'}}>
        <h2 style={registerStyle} className="text-center">Registered Events</h2>
          {/* {EventData.map((item, index) => ( */}
            <RegisteredEvent setUserId={setUserId}/>
          {/* // <div style={registeredEventStyle} key={index}>
          //   <Box style={{ padding: "10px" }}>
          //     <div>
          //         <div className="text-center font-textfont font-bold" style={titleStyle}>
          //           {item.EventName}
          //         </div>
          //         <div style={dateStyle}>
          //           {item.Date}
          //         </div>
          //       </div>
          //   </Box>
          // </div>
        // ))} */}
      </div>

    {/* // <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px', marginLeft: '5%', marginRight: '5%'}}>
    //   <div style={{ width: '60%', borderRadius: '5px', padding: '10px' }}>
    //     {EventData.map((item, index) => ( */}
    {/* //     <div style={buttonStyle} key={index}>
    //       <Box
    //         height={100}
    //         width={800}
    //         my={3}
    //         display="flex"
    //         alignItems="center"
    //         justifyContent="space-between"
    //         p={2}
    //       > */}
    {/* //         <div>
    //           <div className="text-center font-textfont font-bold" style={titleStyle}>
    //             {item.EventName}
    //           </div>
    //           <div style={dateStyle}>
    //             {item.Date}
    //           </div>
    //           <div style={dateStyle}>
    //             {item.Subtitle}
    //           </div>
    //         </div>
    //         <div style={arrowStyle}>{'>'}</div>
    //       </Box> */}
    {/* //     </div> */}
    {/* //   ))}
    //   </div> */}


      
    {/* //   <div style={{ width: '35%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
    //     <h2 style={registerStyle} className="text-center">Registered Events</h2>
    //     {EventData.map((item, index) => ( */}
    {/* //       <div style={registeredEventStyle} key={index}>
    //         <Box */}
    {/* //           my={3}
    //           display="flex"
    //           alignItems="center"
    //           justifyContent="space-between"
    //           px={2}
    //         >
    //           <div>
    //             <div className="text-center font-textfont font-bold" style={titleStyle}>
    //               {item.EventName}
    //             </div>
    //             <div style={dateStyle}>
    //               {item.Date}
    //             </div>
    //           </div>
    //         </Box> */}
    {/* //       </div> */}
    {/* //     ))}
    //   </div> */}

    </div>
  );
};

export default EventPage;
