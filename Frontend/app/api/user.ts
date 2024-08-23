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
