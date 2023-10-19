import { Button } from "antd";

const CreateButton = ({ label, icon, event, type }) => {
    return (
        <Button
            onClick={event}
            type="primary"
            htmlType="button"
            shape="round"
            className={`  ${
                type === "record"
                    ? " !bg-primaryGreen hover:!bg-primaryGreen/80 hidden md:flex "
                    : " !bg-primaryBlue hover:!bg-primaryBlue/80 "
            } flex items-center text-base `}
        >
            {" "}
            <i className="material-symbols-outlined"> {icon} </i> {label}{" "}
        </Button>
    );
};

export default CreateButton;
