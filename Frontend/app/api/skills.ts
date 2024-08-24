import axios, { AxiosResponse } from 'axios';
export enum Skills {
    Storytelling = "Storytelling"
}
export interface Skill {
    skill_id: string;
    // skill_video: Url;
    name: Skills;
}
export interface UseSkillHookResponse {
    create: (params: Skill) => Promise<unknown>;
    read: (id: string) => Promise<Skill>;
    update: (id: string, params: Partial<Skill>) => Promise<Skill>;
    remove: (id: string) => Promise<unknown>;
}

const baseUrl = '/api/skills';

export const useSkillHook = (): UseSkillHookResponse => {

// CREATE SKILL : POST /skills
  const create = async (params: Skill): Promise<unknown> => {
    const response: AxiosResponse<Skill> = await axios.post(baseUrl, params);
    return response.status;
  };

// READ SKILL : GET /skills/:id
  const read = async (id: string): Promise<Skill> => {
    const response: AxiosResponse<Skill> = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };

// UPDATE SKILL : PATCH /skills/:id (in the body, send the fields to update)
  const update = async (id: string, params: Partial<Skill>): Promise<Skill> => {
    const response: AxiosResponse<Skill> = await axios.patch(`${baseUrl}/${id}`, params);
    return response.data;
  };


// DELETE SKILL : DELETE /skills/:id
  const remove = async (id: string): Promise<unknown> => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status;
  };

  return { create, read, update, remove };
};