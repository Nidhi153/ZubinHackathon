import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connect from "../../lib/database";
import User from "../../models/User";

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
  if (!data.email || !data.password) {
    return NextResponse.json({
      message: "Email and password are required",
    });
  }
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
    console.log("user found:", result);
    if (isPasswordValid) {
      const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });
      return NextResponse.json({ userId: result._id, role: result.role });
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
