import { Button } from "antd";

const SubmitButton = ({
    label,
    event,
    isSubmitting,
    isFixedWidth,
    extraStyle,
}) => {
    return (
        <Button
            onClick={event}
            type="primary"
            htmlType="submit"
            shape="round"
            //loading
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
