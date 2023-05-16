import axios from 'axios';
export class ApiWorkersType {
    PATH: string = process.env.REACT_APP_GLOBAL_URL+'/workers-type'

    async getAllWorkerTypes() {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const result = await axios.get(this.PATH, { headers });
        return result;
    }
} 