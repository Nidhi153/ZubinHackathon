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
  // try {
  //   await User.deleteMany({});
  // } catch (e) {
  //   console.log("Error deleting users", e);
  // }

  //   if (!validateEmail(data.email)) {
  //     return NextResponse.json({
  //       message: "Invalid email",
  //     });
  //   }

  const result = await User.findOne({ email: data.email });
  if (result) {
    console.log("User already exists, please login");
    return NextResponse.json({
      message: "User already exists",
    });
  } else {
    console.log("Creating user");
    const password = data.password;
    const encryptedPassword = encryptPassword(data.password);
    data.password = encryptedPassword;
    console.log("Encrypted password:", encryptedPassword);
    console.log(
      "Password same as encrpytion:",
      comparePassword(password, data.password)
    );
    const user = await User.create(data);
    return NextResponse.json({
      message: "User created successfully",
      userId: user._id,
    });
  }
}
