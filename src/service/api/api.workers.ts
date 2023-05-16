import axios from 'axios';
import { ApiAuth } from './api.auth';
export class ApiWorkers {
    PATH: string = process.env.REACT_APP_GLOBAL_URL+'/workers'

    async createChoosenServices(workerTypeId: number, workerName: string) {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const result = await axios.post(this.PATH, {
            "name": workerName,
            "data": { "key": "armenian", "value": "barev" },
            "userId": userId,
            "workerTypeId": workerTypeId
        }, { headers });
        return result;
    }

    async getActiveServices():Promise<any>{
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const workersService = new ApiAuth()
        const userId = await (await workersService.getUserId()).data
        const result = await axios.post(this.PATH+"/activeServices", {
            "userId": userId,
        }, { headers });
        return result;
    }
} 