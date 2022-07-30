import axios from "../../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { USER_ENDPOINTS } from "../../constants/endpoints.constants";

function getUserDetails() {
  console.log("is it working");
  return axios.get(USER_ENDPOINTS.userDetails);
}

export function useUserDetails(options) {
  return useQuery(["current-user"], getUserDetails, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...options,
  });
}
