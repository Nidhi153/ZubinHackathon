import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../models/User";
import dotenv from "dotenv";
import connect from "../../lib/database";
const bcrypt = require("bcryptjs");
dotenv.config();

function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
export async function POST(req: Request) {
  console.log("signup post request called");
  const data = await req.json();
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  const result = await User.findOne({ email: data.email });
  if (result) {
    const password = data.password;
    const encryptedPassword = encryptPassword(data.password);
    const isPasswordValid = comparePassword(password, encryptedPassword);
    if (isPasswordValid) {
      return NextResponse.json({
        message: "login successful",
        userId: result._id,
        loggedIn: true,
      });
    } else {
      return NextResponse.json({
        message: "Invalid password",
      });
    }
  }
  return NextResponse.json({
    message: "User does not exist",
  });
}
