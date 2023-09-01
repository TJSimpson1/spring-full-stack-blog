import { User } from "./User";
import { Comment } from "./Comment";

export interface Article {
    id: number;
    name: string;
    title: string;
    content: string[];
    author: User | null;
    comments: Comment[];
    creationDateTime: Date;
    };