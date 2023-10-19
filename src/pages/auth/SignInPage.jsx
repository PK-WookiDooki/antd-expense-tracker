import { SignInForm } from "../../features";
import signInSVG from "../../assets/imgs/img_signin.svg";

const SignInPage = () => {
    return (
        <section className="w-full flex min-h-screen relative bg-[url('src/assets/imgs/img_bg.svg')] bg-center bg-cover bg-no-repeat ">
            <div className=" flex flex-col lg:flex-row lg:max-w-[1440px] w-full py-8 lg:py-0 mx-auto px-4 lg:px-[10.8%] items-center justify-center gap-9 md:gap-12">
                <div className=" w-full flex flex-col text-white lg:pb-14 self-stretch">
                    <img
                        src={signInSVG}
                        alt="SignIn Image"
                        className="lg:mt-auto max-w-[500px] md:w-full w-[70%] mx-auto lg:mx-0 "
                    />
                    <div className="mt-auto hidden lg:block ">
                        <h3 className="text-dark text-2xl  ">Nextracker</h3>
                        <p className="text-lightGray">
                            Your finances in one place.
                        </p>
                    </div>
                </div>
                <SignInForm />
            </div>
        </section>
    );
};

export default SignInPage;
