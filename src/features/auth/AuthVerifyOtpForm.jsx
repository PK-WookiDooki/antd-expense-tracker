import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { FixWButton, FormTitle, SubmitBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { useDispatch } from "react-redux";
import { useResendOtpMutation, useVerifyOtpMutation } from "./authApi";
import { setMessage } from "../../app/global/globalSlice";

const AuthVerifyOtpForm = () => {
    const { email } = useLocation().state;

    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(59);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const dispatch = useDispatch();
    const [verifyOtp] = useVerifyOtpMutation();

    const onOtpVerify = async (e) => {
        e.preventDefault();
        try {
            if (otp?.trim().length != 6) {
                setError("Invalid OTP received!");
                return;
            }

            const otpData = { otp, email };
            const { data, error: apiError } = await verifyOtp({
                otpData,
            });

            if (data?.success) {
                nav("/signIn", { replace: true });
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
    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }

        if (isResent === true) {
            setTimeout(() => {
                setIsResent(false);
            }, 60000);
        }

        const counter =
            isResent &&
            timer > 0 &&
            setInterval(() => setTimer(timer - 1), 1000);
        return () => clearInterval(counter);
    }, [timer, isResent, error]);

    const [resendOtp] = useResendOtpMutation();

    const onResendOtp = async (e) => {
        e.preventDefault();
        try {
            setIsResent(true);
            const { data, error: apiError } = await resendOtp(email);
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
        <section className=" h-full w-full flex flex-col items-center justify-center bg-whiteGray rounded-2xl ">
            <form
                onSubmit={onOtpVerify}
                className="w-full md:max-w-[480px] max-w-[92%] shadow-md md:p-10 p-0 "
            >
                <div className="mb-8 text-center">
                    <FormTitle
                        title={"Verify Email"}
                        desc={` Please enter the verification code sent to ${(
                            <span className="font-bold"> {email} </span>
                        )}.`}
                    />
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

                <div className="flex flex-col my-8 gap-3 items-center">
                    <p>Do not receive an OTP?</p>
                    <p className={`text-xl ${isResent ? "block" : "hidden"} `}>
                        {" "}
                        {timer} s{" "}
                    </p>
                    <button
                        onClick={onResendOtp}
                        type="button"
                        disabled={isResent}
                        className={` ${
                            isResent
                                ? " text-primaryBlue/20 "
                                : "text-primaryBlue hover:text-primaryBlue/80"
                        } duration-200 `}
                    >
                        {" "}
                        Resend OTP{" "}
                    </button>
                </div>

                <div className="mt-9 flex gap-10 items-center justify-center">
                    <FixWButton isButton={false} label={"back"} />
                    <FixWButton
                        label={"confirm"}
                        htmlType={"submit"}
                        buttonType={"primary"}
                        isButton={true}
                    />
                </div>
                {/*<SubmitBtn label={"Verify"} />*/}
            </form>
        </section>
    );
};

export default AuthVerifyOtpForm;
