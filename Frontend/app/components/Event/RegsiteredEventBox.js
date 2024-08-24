import { Card } from "flowbite-react";
import "./Event.css";
import { Box } from '@chakra-ui/react'

const registeredEventStyle = {
    backgroundColor: '#F0F0F0',
    border: '1px solid #ccc',
    padding: '5px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px',
    margin: '10px',
};

const dateRegsiteredStyle = {
    fontSize: '14px',
    textAlign: 'left',
    marginBottom: '10px'
};

const titleStyle = {
    fontSize: '40px',
    textAlign: 'left'
  };

export default function RegisteredEventBox({ key, event }) {
    return (
      <div style={registeredEventStyle} key={index}>
        <Box style={{ padding: "10px" }}>
          <div>
              <div className="text-center font-textfont font-bold" style={titleStyle}>
                {item.EventName}
              </div>
              <div style={dateRegsiteredStyle}>
                {item.Date}
              </div>
            </div>
        </Box>
      </div>
    );
}