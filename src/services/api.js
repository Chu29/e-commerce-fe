import ky from "ky";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 5000,
  retry: 3,
});
