import axios from 'axios';

export const getUserNameByCode = async (code: string) => {
  try {
    return await axios
      .post<any>(`http://localhost:3000/api/getUserNameByCode`, { code })
      .then((res) => res.data);
  } catch (error) {
    console.error('Error fetching getUserNameByCode:', error);
    return [];
  }
};
