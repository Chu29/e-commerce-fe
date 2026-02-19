import ky from "ky";
import { API_BASE_URL } from "../utils/constants";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 5000,
  retry: 3,
});
