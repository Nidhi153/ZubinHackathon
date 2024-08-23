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
