import {NavLink} from "react-router-dom";
import {toggleSidebar} from "@/app/global/globalSlice";
import {useDispatch} from "react-redux";

const CNavLink = ({icon, title, path}) => {
    const dispatch = useDispatch();

    const closeSidebar = () => {
        dispatch(toggleSidebar(false));
    };

    return (
        <NavLink
            preventScrollReset={true}
            onClick={closeSidebar}
            className="nav-link"
            to={path}
        >
            <i className="material-symbols-rounded"> {icon} </i>
            <span className={"text-lg font-medium"}>{title}</span>
        </NavLink>
    );
};

export default CNavLink;
