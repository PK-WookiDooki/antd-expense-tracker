import {RxCross1} from "react-icons/rx";
import {MdClose} from "react-icons/md";

const ModalHeader = ({event, title, isDanger}) => {
    return (
        <div
            className={` ${isDanger ? "bg-danger" : "bg-primaryGreen"}  px-6 py-4 text-cFA flex items-center justify-between`}>
            <h2 className="text-xl font-medium capitalize"> {title} </h2>
            <button type="button" onClick={event} className="text-3xl ">
                {" "}
                <MdClose/>{" "}
            </button>
        </div>
    );
};

export default ModalHeader;
