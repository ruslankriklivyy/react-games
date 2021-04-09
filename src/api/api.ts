import axios from 'axios';

const auth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

export const userApi = {
  getToken() {
    auth
      .post(
        'token?client_id=9iruphukiixrzpp46qjkyefv41mlgw&client_secret=bqrwk72muo2g3m43983zv1e2wp97ei&grant_type=client_credentials',
      )
      .then(({ data }) => {
        return data;
      });
  },
};
