import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

type Data = {
  message?: string;
  userName?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    code: req.body.code,
    grant_type: 'authorization_code',
    client_id: 'tekton-approve',
    redirect_uri: process.env.KEYCLOAK_REDIRECT_URI,
  };

  axios
    .post(
      `${process.env.KEYCLOAK_API_ENDPOINT}/token`,
      querystring.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      axios
        .get(`${process.env.KEYCLOAK_API_ENDPOINT}/userinfo`, {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        })
        .then((response) => {
          res.status(200).json({ userName: response.data.preferred_username });
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
}
