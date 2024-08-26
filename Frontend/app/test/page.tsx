"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [startedCamera, setStartedCamera] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isTakingAttendance) {
        setStartedCamera(false);
        await fetch("/api/stop");
        return;
      }

      if (!startedCamera) {
        console.log("Starting camera...");
        await fetch("/api/start");

        setStartedCamera(true);
      }

      const fetchData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
          const response = await fetch("/api/data", {
            signal: controller.signal,
          });

          console.log(response);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if ("current_data" in data) {
              console.log(`Received QR Code data: ${data.current_data}`);
            } else {
              console.log("No data available");
            }
          } else {
            console.log("Failed to fetch data");
          }
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Request timed out");
          } else {
            console.log(`Error fetching data: ${error.message}`);
          }
        } finally {
          clearTimeout(timeoutId);
        }
      };
      
      await fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [isTakingAttendance, startedCamera]);

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={() => setIsTakingAttendance(!isTakingAttendance)}>
        {isTakingAttendance ? "Stop Attendance" : "Start Attendance"}
      </button>
    </div>
  );
}
