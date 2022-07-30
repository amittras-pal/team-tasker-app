import axios from "../../config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { USER_ENDPOINTS } from "../../constants/endpoints.constants";

function searchByEmail(emailId) {
  return axios.get(USER_ENDPOINTS.searchByEmail, {
    params: { emailId },
  });
}

function createAccount(payload) {
  return axios.post(USER_ENDPOINTS.register, payload);
}

export function useCreateAccount(options) {
  return useMutation(createAccount, options);
}

export function useSearchByEmail(options) {
  return useMutation(searchByEmail, options);
}
