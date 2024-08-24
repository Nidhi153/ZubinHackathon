import axios, { AxiosResponse } from 'axios';
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
export async function createUser(user: User): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post('/users', user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// GET ALL USERS : GET /users
export async function getAllUsers(): Promise<User[]> {
  try {
    const response: AxiosResponse<User[]> = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

// READ USER : GET /users/:id
export async function getUser(id: string): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}


// UPDATE USER : PATCH /users/:id (in the body, send the fields to update)
export async function updateUser(id: string, updatedUser: Partial<User>): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.patch(`/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// DELETE USER : DELETE /users/:id
export async function deleteUser(id: string): Promise<void> {
  try {
    await axios.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// CREATE VOLUNTEER : POST /volunteers
export async function createVolunteer(volunteer: Volunteer): Promise<Volunteer> {
  try {
    const response: AxiosResponse<Volunteer> = await axios.post('/volunteers', volunteer);
    return response.data;
  } catch (error) {
    console.error('Error creating volunteer:', error);
    throw error;
  }
}

// GET ALL VOLUNTEERS : GET /volunteers
export async function getAllVolunteers(): Promise<Volunteer[]> {
  try {
    const response: AxiosResponse<Volunteer[]> = await axios.get('/volunteers');
    return response.data;
  } catch (error) {
    console.error('Error getting volunteers:', error);
    throw error;
  }
}

// READ VOLUNTEER : GET /volunteers/:id
export async function getVolunteer(id: string): Promise<Volunteer> {
  try {
    const response: AxiosResponse<Volunteer> = await axios.get(`/volunteers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting volunteer:', error);
    throw error;
  }
}

// UPDATE VOLUNTEER : PATCH /volunteers/:id
export async function updateVolunteer(id: string, updatedVolunteer: Partial<Volunteer>): Promise<Volunteer> {
  try {
    const response: AxiosResponse<Volunteer> = await axios.patch(`/volunteers/${id}`, updatedVolunteer);
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer:', error);
    throw error;
  }
}

// DELETE VOLUNTEER : DELETE /volunteers/:id
export async function deleteVolunteer(id: string): Promise<void> {
  try {
    await axios.delete(`/volunteers/${id}`);
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    throw error;
  }
}

// CREATE PARTICIPANT : POST /participants
export async function createParticipant(participant: Participant): Promise<Participant> {
  try {
    const response: AxiosResponse<Participant> = await axios.post('/participants', participant);
    return response.data;
  } catch (error) {
    console.error('Error creating participant:', error);
    throw error;
  }
}

// GET ALL PARTICIPANTS : GET /participants
export async function getAllParticipants(): Promise<Participant[]> {
  try {
    const response: AxiosResponse<Participant[]> = await axios.get('/participants');
    return response.data;
  } catch (error) {
    console.error('Error getting participants:', error);
    throw error;
  }
}

// READ PARTICIPANT : GET /participants/:id
export async function getParticipant(id: string): Promise<Participant> {
  try {
    const response: AxiosResponse<Participant> = await axios.get(`/participants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting participant:', error);
    throw error;
  }
}

// UPDATE PARTICIPANT : PATCH /participants/:id
export async function updateParticipant(id: string, updatedParticipant: Partial<Participant>): Promise<Participant> {
  try {
    const response: AxiosResponse<Participant> = await axios.patch(`/participants/${id}`, updatedParticipant);
    return response.data;
  } catch (error) {
    console.error('Error updating participant:', error);
    throw error;
  }
}

// DELETE PARTICIPANT : DELETE /participants/:id
export async function deleteParticipant(id: string): Promise<void> {
  try {
    await axios.delete(`/participants/${id}`);
  } catch (error) {
    console.error('Error deleting participant:', error);
    throw error;
  }
}

// CREATE ADMIN : POST /admins
export async function createAdmin(admin: Admin): Promise<Admin> {
  try {
    const response: AxiosResponse<Admin> = await axios.post('/admins', admin);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}

// GET ALL ADMINS : GET /admins
export async function getAllAdmins(): Promise<Admin[]> {
  try {
    const response: AxiosResponse<Admin[]> = await axios.get('/admins');
    return response.data;
  } catch (error) {
    console.error('Error getting admins:', error);
    throw error;
  }
}

// READ ADMIN : GET /admins/:id
export async function getAdmin(id: string): Promise<Admin> {
  try {
    const response: AxiosResponse<Admin> = await axios.get(`/admins/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting admin:', error);
    throw error;
  }
}

// UPDATE ADMIN : PATCH /admins/:id
export async function updateAdmin(id: string, updatedAdmin: Partial<Admin>): Promise<Admin> {
  try {
    const response: AxiosResponse<Admin> = await axios.patch(`/admins/${id}`, updatedAdmin);
    return response.data;
  } catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
}

// DELETE ADMIN : DELETE /admins/:id
export async function deleteAdmin(id: string): Promise<void> {
  try {
    await axios.delete(`/admins/${id}`);
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
}
