"use client";
import { Card } from "flowbite-react";
import cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookPic from "../../assets/cookOff.png";
import diversityPic from "../../assets/diversity.jpg";
import unmutePic from "../../assets/recommendation.png";
import "./Event.css";

const EventPage = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [recommendation, setRecommendation] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const userId = cookies.get("userId");
    setUserId(userId);
    const role = cookies.get("role");
    setRole(role);
    let init = async () => {
      const res = await fetch("/api/ai/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      console.log(data);

      if (data.status == 200) {
        setRecommendation(data.recommendedEvents);
      }
    };

    if (role && role == "volunteer") init();
  }, []);

  const imageMapping = [unmutePic, cookPic, diversityPic];
  return (
    <div>
      {userId ? (
        role === "volunteer" && (
          <div>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Recommendation for user
            </h1>
            {recommendation.map((event, idx) => (
              <div
                key={event._id}
                onClick={() => {
                  router.push(`/event/${event._id}`);
                }}
                className="event-card"
              >
                <Card
                  renderImage={() => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <Image
                        width={200}
                        height={200}
                        src={imageMapping[idx]}
                        alt="image 1"
                      />
                    </div>
                  )}
                  style={{ marginBottom: "20px" }}
                >
                  <h1>{event.title}</h1>
                  <p>{event.description}</p>
                </Card>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          <h1>Sign in to see recommendations</h1>
        </div>
      )}
    </div>
  );
};

export default EventPage;
