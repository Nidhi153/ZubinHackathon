import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  console.log("GET request received");

  try {
    const response = await axios.get("http://localhost:2000/data", {
      timeout: 2000,
    });
    const data = response.data;
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out");
        return NextResponse.json({ error: "Request timed out" });
      } else {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
      }
    } else {
      console.log("An unknown error occurred");
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
