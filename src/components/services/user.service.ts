import axios from 'axios';

export default class UserService {
  async getUsersList () {
    try {
      const { data } = await axios.request({
        method: 'GET',
        baseURL: 'https://mbilals.github.io/klausTestData/db.json',
      });

      console.log(data, 'datadatadata');
      

      return data?.users;
    } catch (error) {
      console.error(error);
    }
  }

  async dfsfsdfsd () {
    // try {
    //   const { data } = await axios.request<{ token: string }>({
    //     method: 'POST',
    //     baseURL: dpdDoorToDoorConfig.oldBaseApiUrl,
    //     url: '/token',
    //     data: {
    //       username: dpdDoorToDoorConfig.trackingApiUsername,
    //       password: dpdDoorToDoorConfig.trackingApiPassword,
    //     },
    //   });

    //   log.info('Dpd door to door tracking access token details', data);

    //   const { token } = data;
    //   const tokenExpiry = dpdDoorToDoorConfig.oldTrackingApiTokeenExpiresIn; // The expiry time on token is 30 days. API response only contains token

    //   if (token) {
    //     await redis.setAsync(trackingAuthTokenName, token, 'EX', tokenExpiry);

    //     return token;
    //   }

    //   log.error('Dpd door to door tracking access token is invalid', { token: token });
    //   throw new Error('Dpd door to door tracking access token is invalid');
    // } catch (error) {
    //   log.error('Dpd door to door tracking access token request failed', {
    //     error: error.response,
    //     authUrl: `${dpdDoorToDoorConfig.baseApiUrl}${dpdDoorToDoorConfig.authTokenUrl}`,
    //   });
    //   throw new Error('Dpd door to door tracking access token request failed');
    // }
  }
}
