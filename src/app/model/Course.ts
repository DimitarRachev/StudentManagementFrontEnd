import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Course {
    name: string,
    students: Student[],
    teacher: Teacher
}