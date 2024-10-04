import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "/signin",
        method: "POST",
        body: { email, password },
      }),
    }),

    signUp: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/signup",
        method: "POST",
        body: { name, email, password },
      }),
    }),

    verifyEmail: builder.mutation({
      query: ({ varificationCode: code }) => ({
        url: "/verify-email",
        method: "POST",
        body: { code },
      }),
    }),

    checkAuth: builder.query({
      query: () => "/check-auth",
    }),

    signOut: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password, token },
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useCheckAuthQuery,
  useSignOutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authAPI;

export default authAPI;
