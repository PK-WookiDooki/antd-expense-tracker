import {Dropdown} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logoutAccount} from "@/features/auth/authSlice";
import {toggleSidebar} from "@/app/global/globalSlice";
import {useGetUserDataQuery} from "@/features/auth/userApi";

const AccountMenu = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(toggleSidebar(false))
        nav("/signIn", {replace: true});
    };
    const {token} = useSelector((state) => state.authSlice);
    const {data: userData} = useGetUserDataQuery(token);

    const items = [
        {
            key: 1,
            label: (
                <Link to={"/account"} className="menu-item">
                    {" "}
                    <i className="material-symbols-rounded">person</i>
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
                    <i className="material-symbols-rounded">
                        logout
                    </i> Logout{" "}
                </button>
            ),
            danger: true,
        },
    ];

    return (
        <Dropdown menu={{items}} trigger={["click"]} placement="bottomRight">
            <button
                className="lg:flex items-center gap-1 hidden text-sm "
            >
                {" "}
                <span
                    className="material-symbols-rounded text-2xl h-9 aspect-square rounded-full flex items-center justify-center bg-c26 text-cFA mr-2">
                    person
                </span>
                {userData?.username || "Nexcoder"}

                <i className="material-symbols-rounded">expand_more</i>

            </button>
        </Dropdown>
    );
};

export default AccountMenu;
