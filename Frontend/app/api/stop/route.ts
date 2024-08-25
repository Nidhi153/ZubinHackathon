import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("http://localhost:2000/stop");
    const data = response.data;
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return NextResponse.json({ error: error.message });
    } else {
      console.log("An unknown error occurred");
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
