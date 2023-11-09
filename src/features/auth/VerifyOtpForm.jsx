import {useEffect, useState} from "react";
import OTPInput from "react-otp-input";
import {FormTitle, SubmitBtn} from "@/components";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert} from "antd";
import {useResendOtpMutation, useVerifyOtpMutation} from "./authApi";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";

const VerifyOtpForm = () => {
    const {email, previousRoute} = useLocation().state;
    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(59);
    const [apiMessage, setApiMessage] = useState({
        type: null, content: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [verifyOtp] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const onVerify = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (otp?.trim().length === 0) {
                setApiMessage({type: "error", content: "Please enter OTP code!"});
                setIsSubmitting(false)
                return;
            }
            const {data, error} = await verifyOtp({email, otp});
            if (data?.success) {
                setIsSubmitting(false);
                if (previousRoute === "/signUp") {
                    dispatch(
                        setMessage({
                            msgType: "success",
                            msgContent: "Account registered successfully!",
                        })
                    );
                    nav("/signIn", {replace: true});
                } else if (previousRoute === "/signIn/forgotPassword") {
                    dispatch(
                        setMessage({
                            msgType: "success",
                            msgContent: data?.message,
                        })
                    );
                    nav("/signIn/createNewPassword", {
                        replace: true,
                        state: email,
                    });
                }
            } else {
                setOtp("")
                setIsSubmitting(false);
                setApiMessage({type: "error", content: error?.data?.message || error?.error})
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        if (apiMessage?.content !== null) {
            setTimeout(() => {
                setApiMessage({type: null, content: null});
            }, 5000);
        }
    }, [apiMessage]);

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

    const onResendOtp = async () => {
        setIsResent(true);
        setTimer(59)
        setOtp("")
        try {
            const {data, error: apiError} = await resendOtp({email});
            if (data?.success) {
                setApiMessage({
                    type: "success", content: data?.message
                });
            } else {
                setOtp("")
                setApiMessage({
                    type: "error", content: apiError?.data?.message || apiError?.error
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="w-full flex flex-col items-center justify-center">
            <form
                onSubmit={onVerify}
                className="w-full max-w-[440px] rounded md:shadow-xl lg:p-10 md:p-6 md:bg-white md:border border-cD9 "
            >
                <div className="mb-8 text-center">
                    <FormTitle
                        isCenter={true}
                        title={"Verify Email"}
                        desc={
                            <>
                                {" "}
                                Please enter the verification code sent to{" "}
                                <span className="font-bold">{email}</span>.
                            </>
                        }
                    />
                </div>

                {apiMessage?.content !== null && apiMessage?.type !== null ? (
                    <Alert
                        message={apiMessage?.content}
                        type={apiMessage?.type}
                        showIcon
                        className="mb-5"
                    />
                ) : (
                    ""
                )}

                <OTPInput
                    value={otp}
                    onChange={(code) => setOtp(code)}
                    numInputs={6}
                    inputType={'number'}
                    containerStyle={"otp-form"}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                />

                <div className="flex flex-col my-8 gap-1 md:gap-3 items-center text-c26 ">
                    <p className={"text-sm"}>Do not receive an OTP?</p>
                    <p className={`text-xl ${isResent ? "block" : "hidden"} `}>
                        {" "}
                        {timer} s{" "}
                    </p>
                    <button
                        onClick={onResendOtp}
                        type="button"
                        disabled={isResent}
                        className={` font-medium ${
                            isResent
                                ? " text-[#20C]/50 "
                                : "text-[#20C]"
                        } `}
                    >
                        {" "}
                        Resend OTP{" "}
                    </button>
                </div>

                <SubmitBtn label={"Verify"} isLoading={isSubmitting}/>
            </form>
        </section>
    );
};

export default VerifyOtpForm;
