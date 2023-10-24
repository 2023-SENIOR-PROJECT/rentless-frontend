import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";
import { TResponse } from "../types/ApiError";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({ email, pwd }: { email: string; pwd: string }) =>
      (
        await apiClient.post<TResponse<UserInfo>>(`http://localhost:8080/auth/login`, {
          email,
          pwd,
        })
      ).data,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      firstname,
      lastname,
      email,
      password1,
      password2,
    }: {
      firstname: string;
      lastname: string;
      email: string;
      password1: string;
      password2: string;
    }) =>
      (
        await apiClient.post<TResponse<UserInfo>>(`http://localhost:8080/auth/register`, {
          firstname,
          lastname,
          email,
          password1,
          password2,
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient.put<UserInfo>(`http://localhost:8080/api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  });
