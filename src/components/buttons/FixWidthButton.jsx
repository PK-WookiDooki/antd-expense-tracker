import { Button } from "antd";
import { Link } from "react-router-dom";
const FixWidthButton = ({ label, buttonType, htmlType, event, isButton, isLoading, path }) => {
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
            to={path}
            className=" max-w-[180px] w-full border rounded-full flex items-center justify-center h-10 !border-dark !text-dark hover:!border-danger hover:!bg-danger hover:!text-whiteGray capitalize duration-300"
        >
            {label}
        </Link>
    );
};

export default FixWidthButton;
