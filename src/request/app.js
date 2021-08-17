import axios from "axios";

export function requestWyy(config) {
  const instance = axios.create({
    baseURL: "https://autumnfish.cn",
  });
  return instance(config);
}
