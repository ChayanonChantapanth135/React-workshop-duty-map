import axios from "axios";

const API_URL = "http://localhost:3000";

const client = axios.create({
  baseURL: API_URL,
});

export const api = {
  async get(path) {
    const { data } = await client.get(path);
    return data;
  },
  async post(path, body) {
    // fn body
    const { data } = await client.post(path, body);
    return data;
  },
  async patch(path, body) {
    const { data } = await client.patch(path, body);
    return data;
  },
  async delete(path) {
    const { data } = await client.delete(path);
    return data;
  },
};
