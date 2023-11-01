import {SignUpForm} from "@/features";

const SignUpPage = () => {
    return (
        <section
            className="w-full flex flex-col lg:flex-row min-h-screen px-4 md:px-0 relative">
            <div className={" bg-[url('@/assets/imgs/img_signup.svg')] bg-center bg-no-repeat bg-cover w-full "}>
            </div>
            <div className={"w-full"}></div>
            <div
                className={"w-full flex flex-col lg:flex-row min-h-screen px-4 md:px-0 absolute top-0 left-1/2 transform -translate-x-1/2  max-w-[1440px]"}>
                <div
                    className="lg:flex justify-center self-start text-white pt-[260px] hidden w-full">
                    <div>
                        <p className="text-[40px] leading-[48px] text-[#F5F5F5] ">Welcome to</p>
                        <h2 className="text-[96px] font-dms ">Nextracker</h2>
                        <p className="text-lg font-medium text-[#F5F5F5] ">
                            Let us help you manage your finances.{" "}
                        </p>
                    </div>
                </div>
                <SignUpForm/>
            </div>

        </section>
    );
};

export default SignUpPage;
