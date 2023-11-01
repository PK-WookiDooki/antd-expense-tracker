import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <section
            className=" min-h-screen w-full bg-lightGreen flex items-center justify-center relative z-0 overflow-hidden">
            {/* large balls */}
            <span
                className="md:w-[800px] md:h-[800px] w-[450px] h-[450px]  bg-gradient-to-bl from-primaryGreen absolute  lg:-top-80 lg:-left-[400px] md:-top-72 md:-left-[350px] -top-48 -left-56 rounded-full"></span>
            <span
                className="md:w-[700px] md:h-[700px] w-[400px] h-[400px] bg-gradient-to-br from-primaryGreen absolute lg:-bottom-96 lg:-right-64 md:-bottom-80 md:-right-48 -bottom-40 -right-48 rounded-full -z-[1]"></span>

            {/* small balls */}
            <span
                className="md:w-[400px] md:h-[400px] w-56 h-56 bg-gradient-to-t from-primaryGreen absolute lg:-top-64 lg:right-32 md:-top-52 md:-right-32 -top-24 -right-20 rounded-full -z-[1]"></span>
            <span
                className="md:w-[400px] md:h-[400px] w-56 h-56 bg-gradient-to-b from-primaryGreen absolute lg:-bottom-72 lg:left-32  md:-bottom-56 md:-left-48 -bottom-28 -left-20 rounded-full -z-[1]"></span>

            <div className="flex flex-col gap-6 items-center z-10 ">
                <h2 className="md:text-[100px] text-[80px] font-bold bg-gradient-to-br from-primaryGreen to-pieBg  bg-clip-text text-transparent text-ellipsis ">
                    {" "}
                    Oops!{" "}
                </h2>
                <h3 className="md:text-4xl text-3xl uppercase font-semibold ">
                    404 - Page Not Found
                </h3>
                <p>The page your were looking for is not found!</p>

                <Link
                    to={"/"}
                    className=" text-cFA px-5 py-2 rounded-full bg-primaryGreen hover:bg-primaryGreen/80 duration-300"
                >
                    {" "}
                    Go to Homepage{" "}
                </Link>
            </div>
        </section>
    );
};

export default PageNotFound;
