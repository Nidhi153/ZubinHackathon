import { useCallback, useEffect, useState } from "react";
import InputGroup from "../InputGroup/InputGroup";
import styles from "./Dashboard.module.scss";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { Badge } from "flowbite-react";
import TextRow from "@/app/account/Row/TextRow";
import QuestionRow from "../QuestionRow/QuestionRow";
import { Checkbox, Stack } from "@chakra-ui/react";

export interface Question {
  question: string,
  inputType: string,
}

export default function CreateEvent({ userId }: { userId: string }) {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [presetQuestions, setPresetQuestions] = useState<Question[]>([]) // Questions previously set by admin
  const [finalQuestions, setFinalQuestions] = useState<Question[]>([]) // Final questions to be submitted

  /* Post event checkboxes */
  const [checkedItems, setCheckedItems] = useState([false, false, false])
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked


  /* Fills in preset and final questions at the beginning */
  useEffect(() => {
    const questions = [
      { question: 'Name', inputType: 'short answer' },
      { question: 'Phone number', inputType: 'short answer' },
    ]

    setPresetQuestions(questions)
    setFinalQuestions(questions)
  }, [])

  const handleAddQuestion = useCallback(() => {
    const newFinalQuestions = [...finalQuestions]
    newFinalQuestions.push({
      question: '',
      inputType: 'short answer'
    })
    setFinalQuestions(newFinalQuestions)
  }, [finalQuestions])

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

  const handleEditTemplate = useCallback(() => {
    router.push('/create-event/edit-template')
  }, [])

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
      <div className={styles.rowWrapper}>
        <h2>Questions to Participants</h2>
        <Button onClick={handleEditTemplate}>Edit template</Button>
      </div>
      {presetQuestions.map((question) => (
        <TextRow property={question.question} value={question.inputType} />
      ))}
      {finalQuestions.filter((question, i) => (i >= presetQuestions.length)).map((question, i) => (
        <QuestionRow
          questionValue={question.question}
          selectValue={question.inputType}
          questionOnChange={(e) => {
            const newFinalQuestions = [...finalQuestions]
            newFinalQuestions[presetQuestions.length + i] = {
              question: e.target.value,
              inputType: newFinalQuestions[presetQuestions.length + i].inputType,
            }
            setFinalQuestions(newFinalQuestions)
          }}
          selectOnChange={(e) => {
            const newFinalQuestions = [...finalQuestions]
            newFinalQuestions[presetQuestions.length + i] = {
              question: newFinalQuestions[presetQuestions.length + i].question,
              inputType: e.target.value,
            }
            setFinalQuestions(newFinalQuestions)
          }}
        />
      ))}
      <Button onClick={handleAddQuestion}>Add question</Button>

      {/* Dummy checkboxes */}
      <div className={styles.postEvents}>
        <h2>Post to</h2>
        <Stack spacing={2} mt={2}>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}
          >
            Select all
          </Checkbox>
          <Stack pl={6} mt={1} spacing={2}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])}
            >
              WhatsApp
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])}
            >
              Facebook
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])}
            >
              Instagram
            </Checkbox>
          </Stack>
        </Stack>
      </div>

      <Button type="submit">Create event</Button>
    </form>
  );
}
