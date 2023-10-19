import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { FixWButton, FormTitle, SubmitBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "antd";

const AuthVerifyOtpForm = () => {
    const { email, previousRoute } = useLocation().state;

    console.log(previousRoute);

    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(59);
    const [error, setError] = useState("");
    const nav = useNavigate();
    const onVerify = (e) => {
        e.preventDefault();
        if (otp?.trim().length != 6) {
            setError("Invalid OTP received!");
            return;
        }
        console.log("OTP: ", otp);
        nav("/signIn", { replace: true });
    };
    useEffect(() => {
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
    }, [timer, isResent]);

    const resendOtp = (e) => {
        setIsResent(true);
        e.preventDefault();
        // call api to send new OTP here
        const randomNumber = Math.floor(Math.random() * 999999 + 100000);
        console.log(randomNumber);
    };

    return (
        <section className=" h-full w-full flex flex-col items-center justify-center bg-whiteGray rounded-2xl ">
            <form
                onSubmit={onVerify}
                className="w-full md:max-w-[480px] max-w-[92%] shadow-md md:p-10 p-0 "
            >
                <div className="mb-8 text-center">
                    {/*<h2 className="text-4xl font-medium text-primaryGreen mb-4">
                        {" "}
                        Verify Email{" "}
                    </h2>
                    <p className="text-base">
                        Please enter the verification code sent to{" "}
                        <span className="font-bold">{email}</span>.
                    </p>*/}

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
                        onClick={resendOtp}
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
