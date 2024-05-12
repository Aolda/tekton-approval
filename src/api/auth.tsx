import axios from 'axios';

export const getToken = async (code: string) => {
  return await axios
    .post(`http://localhost:8000/auth/token`, {
      code: code,
      grant_type: 'authorization_code',
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      redirectUri: process.env.KEYCLOAK_REDIRECT_URI,
    })
    .then((res) => res.data)
    .catch((error) => {
      return error.toJSON();
    });
};

export const getUserInfo = async (token: string) => {
  return await axios
    .get(`http://localhost:8000/auth/userinfo`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res)
    .catch((error) => {
      return error.toJSON();
    });
};
