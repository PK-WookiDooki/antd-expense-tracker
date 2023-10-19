import { CreateNewPasswordForm } from "../../features";
import resetPwsSVG from "../../assets/imgs/img_resetPws.svg";

const CreateNewPasswordPage = () => {
    return (
        <section className="w-full flex  min-h-screen relative  bg-[url('src/assets/imgs/img_bg.svg')] bg-center bg-cover bg-no-repeat ">
            <div className=" flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto  lg:px-[10.8%] gap-9 md:gap-28 lg:gap-0 py-8 lg:py-0">
                <div className=" w-full flex flex-col text-white lg:pb-14">
                    <img
                        src={resetPwsSVG}
                        alt="Forgot Password Image"
                        className=" mt-auto max-w-[500px] md:w-full w-[70%] mx-auto lg:mx-0"
                    />
                    <div className="mt-auto hidden lg:block ">
                        <h3 className="text-dark text-2xl  ">Nextracker</h3>
                        <p className="text-lightGray">
                            Your finances in one place.
                        </p>
                    </div>
                </div>
                <CreateNewPasswordForm />
            </div>
        </section>
    );
};

export default CreateNewPasswordPage;
