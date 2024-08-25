import { Card } from "flowbite-react";
import "./Event.css";
import { Box } from "@chakra-ui/react";
import styles from "../Event/RegisteredEventBox/RegisteredEventCard/RegisteredEventCard.module.scss";

const registeredEventStyle = {
  backgroundColor: "#F0F0F0",
  border: "1px solid #ccc",
  padding: "5px 20px",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px",
  margin: "10px",
};

const dateRegsiteredStyle = {
  fontSize: "14px",
  textAlign: "left",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "40px",
  textAlign: "left",
};
import { useRouter } from "next/navigation";
export default function RegisteredEventBox({ key, event }) {
  const router = useRouter();
  let displayEventDetail = () => {
    const id = event._id;
    console.log("Displaying event detail with id: ", id);
    router.push(`/event/${id}`);
  };
  const displayedDate = new Date(event.date).toDateString();
  return (
    <div className={styles.card}>
        <em>{event.title}</em>
        <span>{displayedDate}</span>
    </div>
    // <div style={registeredEventStyle} key={key}>
    //   <Box style={{ padding: "10px" }} onClick={() => displayEventDetail()}>
    //     <div>
    //       <div
    //         className="text-center font-textfont font-bold"
    //         style={titleStyle}
    //       >
    //         {event.title}
    //       </div>
    //       <div style={dateRegsiteredStyle}>{event.date}</div>
    //     </div>
    //   </Box>
    // </div>
  );
}
