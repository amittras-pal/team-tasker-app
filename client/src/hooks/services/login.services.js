import axios from "../../config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { USER_ENDPOINTS } from "../../constants/endpoints.constants";

function loginUser(payload) {
  return axios.post(USER_ENDPOINTS.login, payload);
}

export function useLoginUser(options) {
  return useMutation(loginUser, options);
}
