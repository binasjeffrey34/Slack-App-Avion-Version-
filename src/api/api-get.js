import axios from "axios";
import { API_URL } from "../constant/apiUrl";

const params = JSON.parse(localStorage.getItem("headers")) || {};
export const axiosFetch = axios.create({
  baseURL: API_URL,
  headers: {
    "access-token": params["access-token"] || "",
    client: params.client || "",
    expiry: params.expiry || "",
    uid: params.uid || "",
  },
});
