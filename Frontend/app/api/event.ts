import axios from "axios";
import { Skills } from "./skills";
import { User } from "./user";

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  creator: User;
  date: Date;
  quota: number;
  start_datetime: String;
  end_datetime: String
  required_skills: Skills[];
  created_at: string;
  updated_at: string;
  // user_ids: string[];
}

export interface Registration {
  registration_id: string;
  user_id: string;
  event_id: string;
  role: string; // whether they're a member or a volunteer?
  created_at: Date;
}

//I'M CONSIDERING STORING THIS ENTIRELY AS AN ARRAY IN EVENT
export interface Waitlist {
  user_id: string;
  event_id: string;
  signed_up_at: Date; // so we can figure out who moves out the waitlist first
}

// CREATE EVENT : POST /events
export async function createEvent(event: Event): Promise<Event> {
  const response = await axios.post('/events', event);
  return response.data;
}

// GET ALL EVENTS : GET /events
export async function getAllEvents(): Promise<Event[]> {
  const response = await axios.get('/events');
  return response.data;
}

// READ EVENT : GET /events/:id
export async function getEvent(id: string): Promise<Event> {
  const response = await axios.get(`/events/${id}`);
  return response.data;
}

// UPDATE EVENT : PATCH /events/:id (in the body, send the fields to update)
export async function updateEvent(id: string, updatedEvent: Partial<Event>): Promise<Event> {
  const response = await axios.patch(`/events/${id}`, updatedEvent);
  return response.data;
}

// DELETE EVENT : DELETE /events/:id
export async function deleteEvent(id: string): Promise<void> {
  await axios.delete(`/events/${id}`);
}

// CREATE REGISTRATION : POST /registrations (in the body, send the user_id and event_id)
export async function createRegistration(registration: Omit<Registration, 'registration_id' | 'created_at'>): Promise<Registration> {
  const response = await axios.post('/registrations', registration);
  return response.data;
}

// READ REGISTRATION : GET /registrations/:id
export async function getRegistration(id: string): Promise<Registration> {
  const response = await axios.get(`/registrations/${id}`);
  return response.data;
}

// READ REGISTRATIONS FOR EVENT : GET /registrations?event_id=:id
export async function getRegistrationsForEvent(eventId: string): Promise<Registration[]> {
  const response = await axios.get(`/registrations?event_id=${eventId}`);
  return response.data;
}

// READ REGISTRATIONS FOR USER : GET /registrations?user_id=:id
export async function getRegistrationsForUser(userId: string): Promise<Registration[]> {
  const response = await axios.get(`/registrations?user_id=${userId}`);
  return response.data;
}

// UPDATE REGISTRATION : PATCH /registrations/:id (in the body, send the fields to update)
export async function updateRegistration(id: string, updatedRegistration: Partial<Registration>): Promise<Registration> {
  const response = await axios.patch(`/registrations/${id}`, updatedRegistration);
  return response.data;
}

// DELETE REGISTRATION : DELETE /registrations/:id
export async function deleteRegistration(id: string): Promise<void> {
  await axios.delete(`/registrations/${id}`);
}

// CREATE WAITLIST : POST /waitlist (in the body, send the user_id and event_id)
export async function createWaitlist(waitlist: Omit<Waitlist, 'signed_up_at'>): Promise<Waitlist> {
  const response = await axios.post('/waitlist', waitlist);
  return response.data;
}

// READ WAITLIST : GET /waitlist/:id
export async function getWaitlist(id: string): Promise<Waitlist> {
  const response = await axios.get(`/waitlist/${id}`);
  return response.data;
}

// READ WAITLIST FOR EVENT : GET /waitlist?event_id=:id
export async function getWaitlistForEvent(eventId: string): Promise<Waitlist[]> {
  const response = await axios.get(`/waitlist?event_id=${eventId}`);
  return response.data;
}

// READ WAITLIST FOR USER : GET /waitlist?user_id=:id
export async function getWaitlistForUser(userId: string): Promise<Waitlist[]> {
  const response = await axios.get(`/waitlist?user_id=${userId}`);
  return response.data;
}

// UPDATE WAITLIST : PATCH /waitlist/:id (in the body, send the fields to update)
export async function updateWaitlist(id: string, updatedWaitlist: Partial<Waitlist>): Promise<Waitlist> {
  const response = await axios.patch(`/waitlist/${id}`, updatedWaitlist);
  return response.data;
}

// DELETE WAITLIST : DELETE /waitlist/:id
export async function deleteWaitlist(id: string): Promise<void> {
  await axios.delete(`/waitlist/${id}`);
}
