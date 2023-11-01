import {useDispatch, useSelector} from "react-redux";
import Header from "./navbar/Header";
import Sidebar from "./sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {toggleSidebar} from "@/app/global/globalSlice.js";

const MainLayout = () => {
    const {isSidebarOpen} = useSelector((state) => state.globalSlice);

    const dispatch = useDispatch()

    return (
        <section className="flex flex-row min-h-screen !font-sans bg-cFA">
            <Sidebar/>
            <main className=" bg-lightGreen flex flex-1 flex-col min-h-screen overflow-clip  ">
                <Header/>
                <section className="md:px-8 lg:pr-14 px-4 py-6 lg:py-3 flex-1 max-w-[100vw]">
                    <Outlet/>{" "}
                    <div
                        onClick={() => dispatch(toggleSidebar(false))}
                        className={` fixed top-0 left-0 w-full h-full bg-black/40 transform  ${
                            isSidebarOpen
                                ? " md:translate-x-0 lg:-translate-x-[100vw] -translate-x-[100vw] md:opacity-100 opacity-0 "
                                : " -translate-x-[100vw] opacity-0"
                        } duration-300 z-[8]`}
                    ></div>
                </section>
            </main>
        </section>
    );
};

export default MainLayout;
