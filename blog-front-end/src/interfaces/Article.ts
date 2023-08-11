import { User } from "./User";

export interface Article {
    id: number;
    name: string;
    title: string;
    content: string[];
    author: User | null;
    };