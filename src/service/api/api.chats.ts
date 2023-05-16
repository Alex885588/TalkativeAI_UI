import axios from 'axios';
import { ApiAuth } from './api.auth';
import { ApiUsersInChats } from './api.groups';
export class ApiChat {
    PATH: string = process.env.REACT_APP_GLOBAL_URL + '/chats'

    async createChat(chatName: string) {
        const token = localStorage.getItem('token')
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH, {
            chatName: chatName
        }, { headers });
        const groupsService = new ApiUsersInChats()
        await groupsService.createGroupForUser(token, userId, result.data.id)
        return result;
    }

    async createFirstChat(token: any, chatName: string) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH + '/defaultGroup', {
            chatName: chatName
        }, { headers });
        return result;
    }

    async getChatsNamesByIds(id: number[]) {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH + '/chatNames', {
            chatIds: id
        }, { headers })

        return result
    }

    async updateChatName(id: number, chatName: string) {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.put(this.PATH + `/${id}`, { chatName: chatName }, { headers })
        return result
    }

}

export { ApiUsersInChats };
