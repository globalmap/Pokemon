import axiosInstance from "./axiosInstance"

export const getPokemonData = async (name: string) => {
  const axios = await axiosInstance.get(`pokemon/${name}`);

  return axios.data
}