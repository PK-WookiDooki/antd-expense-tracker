import { SignUpForm } from "../../features";

const SignUpPage = () => {
    return (
        <section className="w-full flex flex-col lg:flex-row min-h-screen px-4 md:px-0 ">
            <div className=" bg-[url('src/assets/imgs/img_signup.svg')] bg-center bg-no-repeat bg-cover  w-full lg:flex justify-center text-white pt-[260px] hidden">
                <div className="px-4">
                    <p className="text-[40px] leading-[48px] ">Welcome to</p>
                    <h2 className="text-[96px] ">Nextracker</h2>
                    <p className="text-lg font-medium ">
                        Let us help you manage your finances.{" "}
                    </p>
                </div>
            </div>
            <SignUpForm />
        </section>
    );
};

export default SignUpPage;
