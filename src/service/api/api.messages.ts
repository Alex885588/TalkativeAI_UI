import axios from 'axios';
import { ApiAuth } from './api.auth';
export class ApiMessages {
    PATH: string = process.env.REACT_APP_GLOBAL_URL+'/messages'

    async createMessage(text: string, chatId: number) {
        const token = localStorage.getItem('token')
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH, {
            text: text,
            userId: userId,
            chatId: chatId,
            aiId: null
        },
            { headers });
        return result;
    }

    async createMessageForAi(text: string, chatId: number) { 
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data      
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH, {
            text: text,
            userId: userId,
            chatId: chatId,
            aiId: 1
        },{ headers });
        return result;
    }

    async getMessagesOfuserInChats(chatId: number) {
        const token = localStorage.getItem('token')
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.post(this.PATH + '/getMessageByUserId', {
            userId: userId,
            chatId: chatId,
        }, { headers })
        return result
    }
} 