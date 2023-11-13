import {Button} from "antd";

const SubmitButton = ({
                          label,
                          event,
                          isFixedWidth,
                          extraStyle,
                          isLoading,
                          isDanger
                      }) => {
    return (
        <Button
            onClick={event}
            type="primary"
            htmlType="submit"
            loading={isLoading}
            shape="round"
            className={` flex items-center justify-center ${isDanger ? " !bg-danger hover:!bg-danger/80 " : " !bg-primaryGreen hover:!bg-primaryGreen/80 "} ${
                isFixedWidth ? extraStyle : " w-full "
            } capitalize `}
        >
            {" "}
            {label}{" "}
        </Button>
    );
};

export default SubmitButton;
