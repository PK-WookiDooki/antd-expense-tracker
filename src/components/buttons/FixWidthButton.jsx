import { Button } from "antd";
import { Link } from "react-router-dom";
const FixWidthButton = ({ label, buttonType, htmlType, event, isButton, isLoading }) => {
    return isButton ? (
        <Button
            type={buttonType}
            htmlType={htmlType}
            onClick={event}
            loading={isLoading}
            shape="round"
            className={` max-w-[180px] w-full ${
                buttonType === "primary"
                    ? " !bg-primaryGreen hover:!bg-primaryGreen/80 "
                    : " !border-dark !text-dark hover:!border-danger hover:!bg-danger hover:!text-whiteGray"
            } capitalize duration-300 `}
        >
            {" "}
            {label}{" "}
        </Button>
    ) : (
        <Link
            to={".."}
            className=" min-w-[180px] border rounded-full flex items-center justify-center h-10 !border-dark !text-dark hover:!border-danger hover:!bg-danger hover:!text-whiteGray capitalize duration-300"
        >
            {label}
        </Link>
    );
};

export default FixWidthButton;
