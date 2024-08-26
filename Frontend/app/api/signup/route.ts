import dotenv from "dotenv";
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
  let phoneno = data.phoneno;
  phoneno = phoneno.replace(/\D/g, "");
  if (phoneno.length !== 8) {
    return NextResponse.json({
      message: "Invalid phone number",
    });
  }

  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  const result = await User.findOne({ email: data.email });

  data.phoneno = "+852" + phoneno;
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

    const response = await fetch(
      `http://localhost:${process.env.PY_PORT}/upload-qrcode?input=${data.email}`,
      {
        method: "POST",
      }
    );

    if (!(response.status === 200)) {
      return NextResponse.json({
        message: "Error creating user media id",
        status: 404,
      });
    }
    const res = await response.json();
    console.log(res); // Use or log the media_id to avoid the unused variable warning
    if (!res) {
      return NextResponse.json({
        message: "Error creating user media id",
        status: 404,
      });
    }

    data.media_id = res.response.id;
    const user = await User.create(data);

    return NextResponse.json({
      message: "User created successfully",
      userId: user._id,
      role: user.role,
    });
  }
}
