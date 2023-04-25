import axios from 'axios';

export const axiosCustom = async (method, url, token, data) => {
  await axios({
    method,
    url,
    data: data || {},
    headers: {
      Authorization: JSON.parse(token),
    },
  });
};
