import { Button } from "antd";

const SubmitButton = ({
    label,
    event,
    isFixedWidth,
    extraStyle,
    isLoading
}) => {
    return (
        <Button
            onClick={event}
            type="primary"
            htmlType="submit"
            loading={isLoading}
            shape="round"
            className={`!bg-primaryGreen hover:!bg-primaryGreen/80 ${
                !isFixedWidth ? "w-full" : extraStyle
            } capitalize `}
        >
            {" "}
            {label}{" "}
        </Button>
    );
};

export default SubmitButton;
