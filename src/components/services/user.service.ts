import axios from 'axios';

export default class UserService {
  async getUsersList () {
    try {
      const { data } = await axios.request({
        method: 'GET',
        baseURL: 'https://mbilals.github.io/klausTestData/db.json',
      });

      return data?.users;
    } catch (error) {
      console.error(error);
    }
  }
}
