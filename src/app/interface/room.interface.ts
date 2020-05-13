import { User } from './user.interface';

export interface Room {
    _id?: string;
    roomName: string;
    subject: string;
    users:[User]
}