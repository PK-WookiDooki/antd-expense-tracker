import { EmailVerificationForm } from "@/features";
import forgotPwsSVG from "@/assets/imgs/img_forgotPws.svg";
import { AdvertText } from "@/components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
    const location = useLocation().pathname;
    const nav = useNavigate();

    // useEffect(() => {
    //     if (location === "/signIn/forgotPassword") {
    //         setTimeout(() => {
    //             nav("/signIn", { replace: true });
    //         }, 10000);
    //     }
    // }, [location]);

    return (
        <section className="w-full flex  min-h-screen relative  lg:bg-[url('@/assets/imgs/img_bg.svg')] bg-[url('@/assets/imgs/img_bgMobile.svg')] lg:bg-center bg-cover bg-no-repeat ">
            <div className=" flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto lg:px-[10.8%] gap-9 md:gap-28 py-8 lg:py-0 ">
                <div className=" w-full flex flex-col text-white lg:pb-14">
                    <img
                        src={forgotPwsSVG}
                        alt="Forgot Password Image"
                        className=" mt-auto max-w-[500px] md:w-full w-[70%] mx-auto lg:mx-0"
                    />

                    <AdvertText />
                </div>
                <EmailVerificationForm />
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
