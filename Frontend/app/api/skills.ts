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
    remove: (id: string) => Promise<unknown>;
}


// CREATE SKILL : POST /skills

// READ SKILL : GET /skills/:id

// UPDATE SKILL : PATCH /skills/:id (in the body, send the fields to update)

// DELETE SKILL : DELETE /skills/:id

