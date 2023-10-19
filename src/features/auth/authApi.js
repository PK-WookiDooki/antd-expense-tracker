import { baseApi } from "../../app/global/baseApi";

const endPoint = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerAccount: builder.mutation({
            query: (userData) => ({
                url: `${endPoint}/register`,
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
        }),
        loginAccount: builder.mutation({
            query: (userData) => ({
                url: `${endPoint}/login`,
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
        }),

        verifyOtp: builder.mutation({
            query: (otpData) => ({
                url: `${endPoint}/otp-verify`,
                method: "POST",
                body: otpData,
            }),
            invalidatesTags: ["auth"],
        }),

        resendOtp: builder.mutation({
            query: (email) => ({
                url: `${endPoint}/otp-resend`,
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["auth"],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: `${endPoint}/forgot-password`,
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["auth"],
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${endPoint}/reset-password`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useRegisterAccountMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
