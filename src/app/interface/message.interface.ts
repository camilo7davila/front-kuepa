import { User } from './user.interface';

export interface Message {
    _id?: string;
    room: string;
    user: User;
    message: string;
    createdAt: string
}