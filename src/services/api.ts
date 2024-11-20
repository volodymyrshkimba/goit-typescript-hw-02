import axios from "axios";
import { Image } from "../App.types";

interface AxiosGetData {
  results: Image[];
  total: number;
  total_pages: number;
}

export const requestPhotoByKey = (keyWord: string, page: number) => {
  const axiosParams = {
    params: {
      page: page,
      per_page: 12,
      query: keyWord,
      orientation: "landscape",
      client_id: "_cEZO8aU1C92VerVD8fgjS-e5kaWbfs7zX1oTmKEH-E",
    },

    baseURL: "https://api.unsplash.com/",
  };

  return axios.get<AxiosGetData>("/search/photos", axiosParams);
};
