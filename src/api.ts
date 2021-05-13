import axios from "axios";

export const API = axios.create({
  baseURL: "https://lnmtl.com",
  //   timeout: 30,
  //   headers: { "X-Custom-Header": "foobar" },
});
