import { useState } from "react";
import InputGroup from "../InputGroup/InputGroup";
import styles from "./Dashboard.module.scss";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { Badge } from "flowbite-react";

export default function CreateEvent({ userId }: { userId: string }) {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedSkills.includes(e.target.value)) {
      setSelectedSkills(
        selectedSkills.filter((skill) => skill !== e.target.value)
      );
      return;
    }
    setSelectedSkills([...selectedSkills, e.target.value]);
    console.log(selectedSkills);
  };
  const allSkills = [
    "cooking",
    "cleaning",
    "gardening",
    "teaching",
    "mentoring",
    "counselling",
    "listening",
    "organising",
    "planning",
    "fundraising",
  ];
  const router = useRouter();
  const removeSkill = (skillToRemove: string) => {
    console.log("remove skill", skillToRemove);
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  const Badge = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        margin: "5px",
        padding: "5px",
        // border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "#0ABAB5", // Tiffany Blue
        color: "white",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </span>
  );
  let handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");
    const newEvent = {
      title: title,
      description: description,
      creator: userId,
      date: date,
      start_time: startTime,
      end_time: endTime,
      skills: selectedSkills,
    };
    console.log(newEvent);
    const res = await fetch("/api/events/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();
    if (data.status === 200) {
      alert("Event created successfully");
      router.push("/");
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
      <h1>Create an Event</h1>
      <h2>Event Details</h2>
      <InputGroup
        text="Event title"
        placeholder="Event title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <InputGroup
        text="Date"
        placeholder="Date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        type="date"
      />
      <InputGroup
        text="Start time"
        placeholder="Start time"
        value={startTime}
        onChange={(e) => {
          setStartTime(e.target.value);
        }}
        type="time"
      />
      <InputGroup
        text="End Time"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => {
          setEndTime(e.target.value);
        }}
        type="time"
      />
      <label htmlFor="skills">Skills</label>
      <select
        id="skills"
        multiple
        value={selectedSkills}
        onChange={handleSkillChange}
      >
        {allSkills.map((skill, index) => (
          <option key={index} value={skill}>
            {skill}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <Badge key={index} onClick={() => removeSkill(skill)}>
            {skill}
          </Badge>
        ))}
      </div>
      <InputGroup
        text="Description"
        placeholder="Description"
        isTextArea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Button type="submit">Create event</Button>
    </form>
  );
}
