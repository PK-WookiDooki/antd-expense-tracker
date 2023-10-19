import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../app/global/globalSlice";
import { useDispatch } from "react-redux";

const CNavLink = ({ icon, title, path }) => {
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
            <i className="material-symbols-outlined"> {icon} </i>
            <span>{title}</span>
        </NavLink>
    );
};

export default CNavLink;
