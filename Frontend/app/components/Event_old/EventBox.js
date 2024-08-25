import { Card } from "flowbite-react";
import "./Event.css";
import { Box } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
const buttonStyle = {
  backgroundColor: "#F0F0F0",
  border: "2px solid #000000",
  borderRadius: "25px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px",
  height: "150px",
  width: "750px",
  justifyContent: "space-between",
};

const titleStyle = {
  fontSize: "40px",
  textAlign: "left",
};

const dateStyle = {
  fontSize: "14px",
  textAlign: "left",
};

const arrowStyle = {
  fontSize: "30px",
};
export default function EventBox({ key, event }) {
  const router = useRouter();
  let displayEventDetail = (id) => {
    console.log("Displaying event detail with id: ", id);
    router.push(`/event/${id}`);
  };
  return (
    <Box
      style={buttonStyle}
      className="my-3 p-2 flex justify-between items-center"
      onClick={() => {
        displayEventDetail(event._id);
      }}
    >
      <div className="my-3 p-2 flex flex-col justify-between">
        <div className="font-textfont font-bold" style={titleStyle}>
          {event.title}
        </div>
        <div style={dateStyle}>{event.date}</div>
        <div style={dateStyle}>{event.description}</div>
      </div>
      <div style={arrowStyle}>{">"}</div>
    </Box>
  );
}
