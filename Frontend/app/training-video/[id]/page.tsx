"use client";

import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import styles from "./trainingVideo.module.scss";
import Button from "../../components/Button/Button";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useCallback, useState, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const trainingVideo = ({ params }: { params: { id: string } }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let init = async () => {
      const userId = Cookies.get("userId");
      if (!userId) {
        router.push("/login");
      }
      setUserId(userId);
      if (!params.id) {
        router.push("/");
      }

      setEventId(params.id);
    };
    init();
  });
  const checkboxOnClick = useCallback(() => {
    setChecked(!checked);
    console.log("Checkbox state: " + checked);
  }, [checked]);

  const buttonOnClick = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events/registerVolunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        userId: userId,
      }),
    });
    if (res.status == 200) {
      router.push("/successful-registration");
    } else {
      alert("Failed to register");
      router.push("/");
    }
  };

  return (
    <div className={styles.body}>
      <BreadCrumbContainer
        role="volunteer"
        eventName="Gathering Event"
        eventLink="/event-details"
      />
      <YouTubeEmbed videoid="1FLYZdxsteo" height={400} width={720} />
      <form onSubmit={(e) => buttonOnClick(e)}>
        <Checkbox onInput={checkboxOnClick} required>
          I have finished watching the training video.
        </Checkbox>
        <div className={styles.buttonWrapper}>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </div>
  );
};

export default trainingVideo;
