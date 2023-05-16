import axios from 'axios';
import { ApiAuth } from './api.auth';
export class ApiUsersInChats {
    PATH: string = process.env.REACT_APP_GLOBAL_URL+'/usersInChats'

    async createGroupForUser(token: any, userId: number, chatId: number) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH, {
            userId: userId,
            chatId: chatId
        }, { headers });
        return result;
    }

    async getAllChatsOfUser() {
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH+'/allGroupsOfUser', { userId: userId }, { headers });
        return result;
    }
} 