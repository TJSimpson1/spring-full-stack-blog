import { User } from "./User";

export interface Comment {
  id: number;
  commentText: string;
  timePosted: string; // Change this to string for ISO 8601 datetime
  commenter: User;
  hasReplies: boolean;
  replies: Comment[];
}
