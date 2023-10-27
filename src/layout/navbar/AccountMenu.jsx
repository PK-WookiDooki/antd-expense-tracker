import {Dropdown} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logoutAccount} from "@/features/auth/authSlice";
import {setMessage} from "@/app/global/globalSlice";
import {useGetUserDataQuery} from "@/features/auth/userApi";

const AccountMenu = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAccount());
        dispatch(
            setMessage({msgType: "success", msgContent: "Logout successful!"})
        );
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
        <Dropdown menu={{items}} trigger={["click"]} placement="bottomRight">
            <button
                className="lg:flex items-center gap-1 hidden text-sm "
            >
                {" "}
                <span
                    className="material-symbols-outlined text-2xl h-9 aspect-square rounded-full flex items-center justify-center bg-c26 text-cFA mr-2">
                    person
                </span>
                {userData?.username || "Nexcoder"}

                <i className="material-symbols-outlined">expand_more </i>

            </button>
        </Dropdown>
    );
};

export default AccountMenu;
