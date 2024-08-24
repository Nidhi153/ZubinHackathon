import { useState } from "react";
import InputGroup from "../InputGroup/InputGroup"
import styles from './Dashboard.module.scss'
import Button from "../Button/Button";

export default function CreateEvent({ userId }) {
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const newEvent = {
      title: title,
      description: description,
      creator: userId,
      date: date,
      start_time: startTime,
      end_time: endTime,
    };
    const res = await fetch("/api/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
      <h1>Create an Event</h1>
      <h2>Event Details</h2>
      <InputGroup text="Event title" placeholder="Event title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
      <InputGroup text="Date" placeholder="Date" value={date} onChange={(e) => {setDate(e.target.value)}} type='date' />
      <InputGroup text="Start time" placeholder="Start time" value={startTime} onChange={(e) => {setStartTime(e.target.value)}} type='time' />
      <InputGroup text="End Time" placeholder="End Time" value={endTime} onChange={(e) => {setEndTime(e.target.value)}} type='time' />
      <InputGroup text="Description" placeholder="Description" isTextArea value={description} onChange={(e) => {setDescription(e.target.value)}} />
      <Button type='submit'>Create event</Button>
    </form>
  );
}
