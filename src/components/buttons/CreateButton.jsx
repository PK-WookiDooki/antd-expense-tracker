import {Button} from "antd";

const CreateButton = ({label, event}) => {
    return (
        <Button
            onClick={event}
            type="primary"
            htmlType="button"
            shape="round"
            className={`${
                label === "record"
                    ? " !bg-primaryGreen hover:!bg-primaryGreen/80 hidden md:flex "
                    : " !bg-primaryBlue hover:!bg-primaryBlue/80 !h-9 "
            } flex items-center text-base capitalize `}
        >
            {" "}
            <i className="material-symbols-outlined"> add </i> {label}{" "}
        </Button>
    );
};

export default CreateButton;
