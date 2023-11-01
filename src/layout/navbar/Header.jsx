import {RxCross1, RxHamburgerMenu} from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import {AddNewRecordModal} from "@/features";
import {toggleSidebar} from "@/app/global/globalSlice";

const Header = () => {
    const {isSidebarOpen} = useSelector((state) => state.globalSlice);
    const dispatch = useDispatch();
    const handleSidebar = (e) => {
        e.preventDefault();
        dispatch(toggleSidebar(!isSidebarOpen));
    };

    return (
        <header
            className="lg:pr-14 md:px-8 lg:pt-6 lg:pb-8 px-4 py-[10px] lg:shadow-none shadow flex items-center justify-between lg:justify-end w-full sticky top-0 z-10 lg:bg-lightGreen bg-cFA
          ">
            <div className="flex items-center gap-2 lg:hidden">
                <button onClick={handleSidebar} className="text-2xl">
                    {" "}
                    {isSidebarOpen ? <RxCross1/> : <RxHamburgerMenu/>}{" "}
                </button>
                <h1 className="text-2xl font-medium">
                    <Link onClick={() => dispatch(toggleSidebar(false))} to={"/"}
                          className={"font-dms"}> Nextracker </Link>
                </h1>
            </div>
            <div className="flex items-center gap-3 lg:gap-6">
                <AddNewRecordModal/>
                <div className="flex items-center gap-4">
                    <Link
                        to={"/account"}
                        onClick={() => dispatch(toggleSidebar(false))}
                        className=" lg:pointer-events-none lg:hidden "
                    >
                        <span
                            className="material-symbols-outlined text-2xl md:h-9 h-8 aspect-square rounded-full flex items-center justify-center bg-c26 text-cFA ">
                            person
                        </span>
                    </Link>
                    <AccountMenu/>
                </div>
            </div>
        </header>
    );
};

export default Header;
