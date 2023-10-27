import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <section
            className=" min-h-screen w-full bg-lightGreen flex items-center justify-center relative z-0 overflow-hidden">
            {/* large balls */}
            <span
                className="md:w-[800px] md:h-[800px] w-[450px] h-[450px]  bg-gradient-to-bl from-primaryGreen absolute md:-top-[200px] md:-left-[250px] -top-[200px] -left-[150px] rounded-full"></span>
            <span
                className="md:w-[700px] md:h-[700px] w-[400px] h-[400px] bg-gradient-to-br from-primaryGreen absolute md:-bottom-[100px] md:-right-[180px] -bottom-40 -right-24 rounded-full -z-[1]"></span>

            {/* small balls */}
            <span
                className="md:w-[400px] md:h-[400px] w-56 h-56 bg-gradient-to-t from-primaryGreen absolute md:-top-[250px] md:right-[400px] -top-24 right-16 rounded-full -z-[1]"></span>
            <span
                className="md:w-[400px] md:h-[400px] w-56 h-56 bg-gradient-to-b from-primaryGreen absolute md:-bottom-[200px] md:left-[300px] -bottom-32 left-24 rounded-full -z-[1]"></span>

            <div className="flex flex-col gap-6 items-center z-10 ">
                <h2 className="text-[100px] font-bold bg-gradient-to-br from-primaryGreen to-pieBg  bg-clip-text text-transparent text-ellipsis ">
                    {" "}
                    Oops!{" "}
                </h2>
                <h3 className="text-4xl uppercase font-semibold ">
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
