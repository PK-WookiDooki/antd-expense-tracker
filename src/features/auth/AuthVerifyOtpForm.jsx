import {useEffect, useState} from "react";
import OTPInput from "react-otp-input";
import {FixWButton, SubmitBtn} from "@/components";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useResendOtpMutation, useVerifyOtpMutation} from "./authApi";
import {setMessage} from "@/app/global/globalSlice";
import {useGetUserDataQuery} from "./userApi";
import {logoutAccount} from "./authSlice";

const AuthVerifyOtpForm = () => {
    const {token} = useSelector((state) => state.authSlice);
    const {data: userData} = useGetUserDataQuery(token);
    const newEmail = useLocation().state?.email || "example@gmail.com";

    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(59);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [verifyOtp] = useVerifyOtpMutation();

    const onOtpVerify = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (otp?.trim().length === 0) {
                setError("Please enter OTP code!");
                setIsSubmitting(false)
                return;
            }

            const otpData = {otp, newEmail, email: userData?.email};
            const {data, error: apiError} = await verifyOtp(otpData);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/signIn", {replace: true});
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
                dispatch(logoutAccount());
            } else {
                setIsSubmitting(false);
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    useEffect(() => {
        let counter;
        if (isResent) {
            counter = setInterval(decreaseTimer, 1000)
        } else (
            clearInterval(counter)
        )
        return () => clearInterval(counter)
    }, [timer, isResent])

    const decreaseTimer = () => {
        if (timer > 0) {
            setTimer(timer - 1)
        } else {
            setIsResent(false)
        }
    }

    const [resendOtp] = useResendOtpMutation();

    const onResendOtp = async (e) => {
        e.preventDefault();
        setIsResent(true);
        setTimer(59)
        setOtp("")
        try {
            setOtp("");
            const {data, error: apiError} = await resendOtp({
                newEmail,
                email: userData?.email,
            });
            if (data?.success) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className=" h-full w-full flex flex-col items-center justify-center bg-cFA rounded-2xl p-4  ">
            <form
                onSubmit={onOtpVerify}
                className="w-full max-w-[480px] shadow-md md:p-10 p-4 border border-cD9 "
            >
                <div className="mb-9 text-center">
                    <h2 className="lg:text-4xl text-2xl font-medium text-c26 mb-6">
                        Verify Email
                    </h2>
                    <p className="md:text-base text-sm text-c59 ">
                        Please enter the verification code sent to <span
                        className={"text-c26 font-semibold "}> {newEmail} </span>
                    </p>

                </div>

                {error?.trim().length > 0 ? (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="mb-3"
                    />
                ) : (
                    ""
                )}

                <OTPInput
                    value={otp}
                    onChange={(code) => setOtp(code)}
                    numInputs={6}
                    containerStyle={"otp-form"}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                />

                <div className="flex flex-col my-8 gap-1 md:gap-3 items-center">
                    <p className={"text-sm"}>Do not receive an OTP?</p>
                    <p className={`text-xl ${isResent ? "block" : "hidden"} `}>
                        {timer} s
                    </p>
                    <button
                        onClick={onResendOtp}
                        type="button"
                        disabled={isResent}
                        className={` font-medium ${
                            isResent
                                ? " text-[#20C]/50 "
                                : " text-[#20C] "
                        } duration-200 `}
                    >
                        {" "}
                        Resend OTP{" "}
                    </button>
                </div>

                <div className="mt-9 flex lg:gap-10 md:gap-6 gap-4 items-center justify-center">
                    <FixWButton isButton={false} label={"back"} path={"/account/changeEmail"}
                                cssWidthConfig={"lg:max-w-[180px] md:max-w-[160px] max-w-[138px]"}
                    />
                    <SubmitBtn label={"confirm"} isLoading={isSubmitting} isFixedWidth={true}
                               extraStyle={"lg:max-w-[180px] md:max-w-[160px] max-w-[138px] w-full "}/>
                </div>
            </form>
        </section>
    );
};

export default AuthVerifyOtpForm;
