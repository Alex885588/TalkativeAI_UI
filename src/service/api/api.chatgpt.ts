import axios from 'axios';
export class ApiChatGpt {
    PATH: string = process.env.REACT_APP_GLOBAL_URL+'/chatgpt'

    async createAiRequest(message:string) {
        // const headers = {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        // }
        const result = await axios.post(this.PATH+'/response', {
            message:message
        });
        return result;
    }
} 