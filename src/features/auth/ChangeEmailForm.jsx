import { Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FixWButton } from "../../components";

const ChangeEmailForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;

    const onFormSubmit = (values) => {
        console.log(values);
        nav("/account/verify", {
            state: { email: values.email, previousRoute: currentRoute },
        });
    };
    return (
        <section className=" h-full w-full flex items-center justify-center bg-whiteGray rounded-2xl ">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full md:max-w-[570px] p-10 max-w-[92%] shadow"
            >
                <div className="mb-9 text-left">
                    <h2 className="text-4xl font-medium text-dark mb-6">
                        {" "}
                        Change Email Address{" "}
                    </h2>
                    <p className="text-base">
                        Enter new email address and current password to change
                        email address!
                    </p>
                </div>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required!",
                        },
                    ]}
                >
                    <Input placeholder="example@gmail.com" type="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Password is required!" },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <div className="mt-9 flex gap-10 items-center justify-center">
                    <FixWButton isButton={false} label={"cancel"} />
                    <FixWButton
                        label={"confirm"}
                        htmlType={"submit"}
                        buttonType={"primary"}
                        isButton={true}
                    />
                </div>
            </Form>
        </section>
    );
};

export default ChangeEmailForm;
