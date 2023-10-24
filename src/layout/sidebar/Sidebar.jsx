import { Link, useNavigate } from "react-router-dom";
import CNavLink from "./CNavLink";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { logoutAccount } from "@/features/auth/authSlice";
import { setMessage } from "@/app/global/globalSlice";

const Sidebar = () => {
    const { isSidebarOpen } = useSelector((state) => state.globalSlice);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(
            setMessage({ msgType: "success", msgContent: "Logout successful!" })
        );
        nav("/signIn", { replace: true });
    };

    return (
        <section
            className={`flex flex-col self-start w-full lg:w-[224px] h-full gap-5 lg:sticky top-0 fixed left-0 bg-white z-10 transform pt-20 lg:pt-0 ${
                isSidebarOpen
                    ? " translate-x-0 w-full md:w-[50vw] opacity-100 "
                    : " -translate-x-[100vw] lg:translate-x-0 opacity-0 lg:opacity-100 "
            } duration-300`}
        >
            <h1 className="text-2xl leading-9 font-medium px-4 py-6 hidden lg:block ">
                <Link to={"/"} className=" font-dms ">
                    {" "}
                    Nextracker{" "}
                </Link>
            </h1>

            <ul className="flex flex-col gap-3">
                <CNavLink title={"dashboard"} path={"/"} icon={"dashboard"} />
                <CNavLink
                    title={"records"}
                    path={"/records"}
                    icon={"compare_arrows"}
                />
                <CNavLink
                    title={"categories"}
                    path={"/categories"}
                    icon={"category"}
                />
                <CNavLink
                    title={"budget"}
                    path={"/budget"}
                    icon={"production_quantity_limits"}
                />
            </ul>
            <div className="p-8 mt-auto ">
                <Button
                    onClick={handleLogout}
                    type="primary"
                    className="flex items-center gap-2 lg:hidden !bg-danger hover:!bg-danger/80 w-full justify-center"
                >
                    {" "}
                    <i className="material-symbols-outlined">
                        logout
                    </i> Logout{" "}
                </Button>
            </div>
        </section>
    );
};

export default Sidebar;
