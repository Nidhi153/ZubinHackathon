import { Card } from "flowbite-react";
import "./Event.css";
import styles from "./EventCardGroup/EventCard/EventCard.module.scss";
import { Box } from "@chakra-ui/react";
import arrowIcon from "../../assets/arrowIcon.svg";
import Image from 'next/image';

import { useRouter } from "next/navigation";
// const buttonStyle = {
//   backgroundColor: "#F0F0F0",
//   border: "2px solid #000000",
//   borderRadius: "25px",
//   padding: "10px 20px",
//   fontSize: "16px",
//   cursor: "pointer",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   margin: "10px",
//   height: "150px",
//   width: "750px",
//   justifyContent: "space-between",
// };

// const titleStyle = {
//   fontSize: "40px",
//   textAlign: "left",
// };

// const dateStyle = {
//   fontSize: "14px",
//   textAlign: "left",
// };

// const arrowStyle = {
//   fontSize: "30px",
// };
export default function EventBox({ key, event }) {
  const router = useRouter();
  let displayEventDetail = (id) => {
    console.log("Displaying event detail with id: ", id);
    router.push(`/event/${id}`);
  };

  const dateDisplay = new Date(event.date).toDateString();
  return (
    <div 
    onClick={() => displayEventDetail(event._id)}
    className={styles.card}>
        <div className={styles.text}>
            <span className={styles.title}>{event.title}</span>
            <span>{dateDisplay}</span>
            <span>{event.description}</span>
        </div>
        <Image src={arrowIcon} alt='Arrow Icon' className={styles.icon} />
    </div>
    // <Box
    //   style={buttonStyle}
    //   className="my-3 p-2 flex justify-between items-center"
    //   onClick={() => {
    //     displayEventDetail(event._id);
    //   }}
    // >
    //   <div className="my-3 p-2 flex flex-col justify-between">
    //     <div className="font-textfont font-bold" style={titleStyle}>
    //       {event.title}
    //     </div>
    //     <div style={dateStyle}>{event.date}</div>
    //     <div style={dateStyle}>{event.description}</div>
    //   </div>
    //   <div style={arrowStyle}>{">"}</div>
    // </Box>
  );
}
