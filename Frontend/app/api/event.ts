// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { axiosClient } from "./config";
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


// READ EVENT : GET /events/:id


// UPDATE EVENT : PATCH /events/:id (in the body, send the fields to update)


// DELETE EVENT : DELETE /events/:id


// CREATE REGISTRATION : POST /registrations (in the body, send the user_id and event_id)


// READ REGISTRATION : GET /registrations/:id


// READ REGISTRATIONS FOR EVENT : GET /registrations?event_id=:id


// READ REGISTRATIONS FOR USER : GET /registrations?user_id=:id


// UPDATE REGISTRATION : PATCH /registrations/:id (in the body, send the fields to update)


// DELETE REGISTRATION : DELETE /registrations/:id


// CREATE WAITLIST : POST /waitlist (in the body, send the user_id and event_id)


// READ WAITLIST : GET /waitlist/:id


// READ WAITLIST FOR EVENT : GET /waitlist?event_id=:id


// READ WAITLIST FOR USER : GET /waitlist?user_id=:id


// UPDATE WAITLIST : PATCH /waitlist/:id (in the body, send the fields to update)


// DELETE WAITLIST : DELETE /waitlist/:id


// export interface UseEventHookResponse {
//   create: (params: Event) => Promise<unknown>;
//   remove: (id: string) => Promise<unknown>;
//   update: (id: string, params: Event) => Promise<unknown>;
// }

// export const useEvent = (): UseEventHookResponse => {
//   const queryClient = useQueryClient();

//   const createEventMutation = useMutation({
//     mutationFn: (params: Event) => axiosClient.post("/events", params),

//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["events"] });
//     },
//   });

//   const removeEventMutation = useMutation({
//     mutationFn: (id: string) => axiosClient.delete(`/events/${id}`),

//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["events"] });
//     },
//   });

//   const updateEventMutation = useMutation({
//     mutationFn: (params: Event) =>
//       axiosClient.patch(`/events/${params.id}`, params),

//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["events"] });
//     },
//   });

//   return {
//     create: createEventMutation.mutateAsync,
//     remove: removeEventMutation.mutateAsync,
//     update: updateEventMutation.mutateAsync,
//   };
// };