import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import {
    Account,
    Budget,
    Categories,
    CreateNewPassword,
    DashBoard,
    ForgotPassword,
    PNFPage,
    Records,
    SignIn,
    SignUp,
    Verification,
} from "./pages";
import MainLayout from "./layout/MainLayout";
import {ChangeEmailPage, AuthVerifyOtpPage} from "./features";
import {IsAuth, IsNotAuth, OTPGuard} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {ConfigProvider, message} from "antd";
import {useEffect} from "react";
import {MdCheckCircle, MdError, MdWarning} from "react-icons/md";
import {setMessage} from "./app/global/globalSlice";

const App = () => {
    //notification
    const {message: apiMessage} = useSelector((state) => state.globalSlice);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    useEffect(() => {
        if (apiMessage.msgType && apiMessage.msgContent) {
            openNotification();
            setTimeout(() => {
                dispatch(setMessage({msgType: null, msgContent: null}));
            }, 5000);
        }
    }, [apiMessage]);

    const openNotification = () => {
        messageApi.open({
            type: apiMessage.msgType,
            content: apiMessage.msgContent,
            icon:
                apiMessage.msgType === "success" ? (
                    <MdCheckCircle className=" inline-block mr-2 text-primaryGreen text-xl "/>
                ) : apiMessage.msgType === "error" ? (
                    <MdError className=" inline-block mr-2 text-danger text-xl "/>
                ) : (
                    <MdWarning className=" inline-block mr-2 text-yellow-500 text-xl "/>
                ),
            duration: 3,
        });
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        controlHeightSM: 30,
                        controlHeight: 40,
                        controlHeightLG: 50,
                        //colorBgBase: "#aa0071",
                    },
                    Input: {
                        colorBorder: "#D9D9D9",
                        fontSize: 14,
                        fontFamily: "Roboto",
                        borderRadius: 2
                    },
                    InputNumber: {
                        colorBorder: "#D9D9D9",
                        handleVisible: "auto",
                        controlHeight: 40,
                        fontSize: 14,
                        fontFamily: "Roboto",
                        borderRadius: 2

                    },
                },
            }}
        >
            {contextHolder}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <IsAuth>
                                <MainLayout/>
                            </IsAuth>
                        }
                    >
                        <Route index element={<DashBoard/>}/>
                        <Route path="account">
                            <Route index element={<Account/>}/>
                            <Route
                                path="changeEmail"
                                element={<ChangeEmailPage/>}
                            />
                            <Route
                                path="verify"
                                element={<OTPGuard>
                                    <AuthVerifyOtpPage/>
                                </OTPGuard>}
                            />
                        </Route>
                        <Route path="transactions" element={<Records/>}/>
                        <Route path="categories" element={<Categories/>}/>
                        <Route path="budget" element={<Budget/>}/>
                    </Route>
                    <Route
                        path="/signUp"
                        element={
                            <IsNotAuth>
                                <SignUp/>
                            </IsNotAuth>
                        }
                    />
                    <Route path="/signIn">
                        <Route
                            index
                            element={
                                <IsNotAuth>
                                    <SignIn/>
                                </IsNotAuth>
                            }
                        />
                        <Route
                            path="forgotPassword"
                            element={
                                <IsNotAuth>
                                    <ForgotPassword/>
                                </IsNotAuth>
                            }
                        />
                        <Route
                            path="createNewPassword"
                            element={
                                <IsNotAuth>
                                    <CreateNewPassword/>
                                </IsNotAuth>
                            }
                        />
                    </Route>
                    <Route
                        path="verify"
                        element={
                            <OTPGuard>
                                <Verification/>
                            </OTPGuard>
                        }
                    />
                    <Route path="*" element={<PNFPage/>}/>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
