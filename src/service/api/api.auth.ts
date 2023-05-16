import axios from 'axios';
import { ApiChat } from './api.chats';
import { ApiUsersInChats } from './api.groups';
export class ApiAuth {
  PATH: string = process.env.REACT_APP_GLOBAL_URL + '/users'

  async registerUser(email: string, password: string, repeatPassword: string) {
    const resultFromUser = await axios.post(this.PATH + '/register', {
      email: email,
      password: password,
      repeatPassword: repeatPassword
    });
    console.log(resultFromUser)
    if (!resultFromUser.data) {
      return resultFromUser.data;
    }
    const groupService = new ApiChat();
    const userInChatService = new ApiUsersInChats()
    const token = await this.loginUser(email, password)
    const resultFromChats = await groupService.createFirstChat(token.data.token, 'Group')
    await userInChatService.createGroupForUser(token.data.token, resultFromUser.data.id, resultFromChats.data.id);
    return true
  }

  async loginUser(email: string, password: string) {
    console.log(process.env)
    const result = await axios.post(this.PATH + '/signin', {
      email: email,
      password: password
    });
    if (result) {
      localStorage.setItem('token', result.data.token)
    }
    return result;
  }

  async validateToken(token: string) {
    try {
      const response = await fetch(this.PATH + '/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getUserId() {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const result = await axios.post(this.PATH + '/getId', {}, { headers });
    return result
  }

  async getUserInfo() {
    const id = (await this.getUserId()).data
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const userInfo = await axios.get(this.PATH + `/${id}`, { headers });
    return userInfo
  }

  async getChats() {
    const id = (await this.getUserId()).data
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const userChats = await axios.post(this.PATH + '/getChats', { id: id }, { headers });
    return userChats
  }
} 