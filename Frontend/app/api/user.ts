// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { axiosClient } from "./config";
import { Skills } from "./skills";

export enum Role {
  Participant = "Participant",
  Volunteer = "Volunteer",
  Admin = "Admin"
}

export interface User {
  user_id: string;

  //convert this into just name?
  first_name?: string;
  last_name?: string;

  email: string;
  password: string;
  created_at: Date;

  role: Role;
  contact_number: string; // Check that it's in the right format

//   hkid: string; // I don't think we should store this
//   DOB: Date // I don't think we should store this
}

export interface Volunteer extends User {
    skills: Skills[];
}

export interface Participant extends User {
    // any extra fields we want to store for participants
}

export interface Admin extends User {
    // any extra fields we want to store for admins
}


// CREATE USER : POST /users

// READ USER : GET /users/:id

// UPDATE USER : PATCH /users/:id (in the body, send the fields to update)

// DELETE USER : DELETE /users/:id

// CREATE VOLUNTEER : POST /volunteers

// READ VOLUNTEER : GET /volunteers/:id

// UPDATE VOLUNTEER : PATCH /volunteers/:id (in the body, send the fields to update)

// DELETE VOLUNTEER : DELETE /volunteers/:id

// CREATE PARTICIPANT : POST /participants

// READ PARTICIPANT : GET /participants/:id

// UPDATE PARTICIPANT : PATCH /participants/:id (in the body, send the fields to update)

// DELETE PARTICIPANT : DELETE /participants/:id

// CREATE ADMIN : POST /admins

// READ ADMIN : GET /admins/:id

// UPDATE ADMIN : PATCH /admins/:id (in the body, send the fields to update)

// DELETE ADMIN : DELETE /admins/:id
