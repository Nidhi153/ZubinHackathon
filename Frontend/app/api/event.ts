// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { axiosClient } from "./config";
import { Skills } from "./skills";

export interface Event {
  id: string;
  name: string;
  venue: string;
  dateTime: Date;
  quota: number;
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
}

//I'M CONSIDERING STORING THIS ENTIRELY AS AN ARRAY IN EVENT
export interface Waitlist {
  user_id: string;
  event_id: string;
  signed_up_at: Date; // so we can figure out who moves out the waitlist first
}

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