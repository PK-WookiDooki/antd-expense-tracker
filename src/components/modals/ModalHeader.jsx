import { RxCross1 } from "react-icons/rx";

const ModalHeader = ({ event, title }) => {
    return (
        <div className="bg-primaryGreen px-6 py-4 text-whiteGray flex items-center justify-between">
            <h2 className="text-xl font-medium capitalize"> {title} </h2>
            <button type="button" onClick={event} className="text-xl">
                {" "}
                <RxCross1 />{" "}
            </button>
        </div>
    );
};

export default ModalHeader;
