import {Button} from "antd";
import {Link} from "react-router-dom";

const FixWidthButton = ({label, buttonType, htmlType, event, isButton, isLoading, path}) => {
    return isButton ? (
        <Button
            type={buttonType}
            htmlType={htmlType}
            onClick={event}
            loading={isLoading}
            shape="round"
            className={` max-w-[180px] w-full ${
                buttonType === "primary"
                    ? " !bg-danger hover:!bg-danger/80 "
                    : " !border-c26 !text-c26 hover:!bg-c26/10 !bg-cFA "
            } capitalize duration-300 `}
        >
            {" "}
            {label}{" "}
        </Button>
    ) : (
        <Link
            to={path}
            replace={true}
            className=" max-w-[180px] w-full border rounded-full flex items-center justify-center h-10 !border-c26 !text-c26 hover:!bg-c26/10 !bg-cFA capitalize duration-300 "
        >
            {label}
        </Link>
    );
};

export default FixWidthButton;
