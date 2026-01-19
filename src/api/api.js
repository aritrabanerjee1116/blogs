import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const getAllPosts = () => {
  return axios.get(`${BASE_URL}/posts`);
};

export const getPostById = (id) => {
  return axios.get(`${BASE_URL}/posts/${id}`);
};

export const getPostsByUser = (userId) => {
  return axios.get(`${BASE_URL}/posts/user/${userId}`);
};
