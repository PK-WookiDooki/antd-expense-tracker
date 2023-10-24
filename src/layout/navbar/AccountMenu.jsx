import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAccount } from "@/features/auth/authSlice";
import { setMessage } from "@/app/global/globalSlice";
import { useGetUserDataQuery } from "@/features/auth/userApi";
import { useState } from "react";

const AccountMenu = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [isDDOpen, setIsDDOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(
            setMessage({ msgType: "success", msgContent: "Logout successful!" })
        );
        nav("/signIn", { replace: true });
    };
    const { token } = useSelector((state) => state.authSlice);
    const { data: userData } = useGetUserDataQuery(token);

    const items = [
        {
            key: 1,
            label: (
                <Link to={"/account"} className="menu-item">
                    {" "}
                    <i className="material-symbols-outlined">person</i>
                    Account
                </Link>
            ),
        },
        {
            key: 2,
            label: (
                <button
                    onClick={handleLogout}
                    type="button"
                    className="menu-item "
                >
                    {" "}
                    <i className="material-symbols-outlined">
                        logout
                    </i> Logout{" "}
                </button>
            ),
            danger: true,
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <button
                onClick={() => setIsDDOpen(!isDDOpen)}
                className="lg:flex items-center gap-1 hidden"
            >
                {" "}
                <span className="material-symbols-outlined text-2xl h-10 w-10 rounded-full flex items-center justify-center bg-dark text-whiteGray mr-1">
                    person
                </span>
                {userData?.username || "Nexcoder"}
                {isDDOpen ? (
                    <i className="material-symbols-outlined">expand_less </i>
                ) : (
                    <i className="material-symbols-outlined">expand_more </i>
                )}{" "}
            </button>
        </Dropdown>
    );
};

export default AccountMenu;
