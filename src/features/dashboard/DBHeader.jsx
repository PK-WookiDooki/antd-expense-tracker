import {DatePicker} from "antd";
import {formatCurrency} from "@/core/functions/formatData";
import {useGetUserDataQuery} from "../auth/userApi";
import {useSelector} from "react-redux";
import dbImg from "@/assets/imgs/img_dbHeader.svg"

const DBHeader = ({startDate, endDate, setStartDate, setEndDate}) => {
    const {token} = useSelector((state) => state.authSlice);
    const {data: userData} = useGetUserDataQuery(token);
    const balance = parseInt(userData?.balance);
    const formattedAmount = formatCurrency(balance);

    return (
        <section className="relative rounded-2xl bg-cover bg-no-repeat bg-right"
                 style={{backgroundImage: `url(${dbImg})`}}>
            <div
                className="flex flex-col md:flex-row justify-between text-white p-4 lg:p-10 md:p-5 md:items-center gap-4">
                {/* balance */}
                <div className="w-full lg:w-auto">
                    <p className=" text-sm md:text-base lg:text-xl mb-2">Account Balance</p>
                    <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium lg:mb-8 md:mb-6 mb-4 font-rbs ">
                        {" "}
                        {formattedAmount}
                    </h2>
                    <p className="text-[10px] md:text-sm lg:text-base font-light ">
                        {" "}
                        &ldquo; Your financial compass: The Main Balance – your
                        central <br className=" md:hidden "/> hub <br className="lg:block hidden"/> for
                        tracking and managing expenses effortlessly. &rdquo;
                    </p>
                </div>
                <span className=" md:w-[1px] w-full h-[1px] md:h-auto bg-whiteGray block md:self-stretch"></span>
                <div
                    className="flex items-center lg:gap-9 md:gap-2 gap-4 lg:p-6 md:p-4 p-3 rounded-md bg-black/30 w-full lg:w-auto">
                    <div className="datepicker-wrapper">
                        <label
                            htmlFor="startDate"
                            className="datepicker-label"
                        >
                            Start Date
                        </label>
                        <DatePicker
                            id="startDate"
                            defaultValue={startDate}
                            format={"DD-MM-YYYY"}
                            onChange={(value) => setStartDate(value)}
                            disabledDate={(date) =>
                                !date || date.isAfter(endDate)
                            }
                            allowClear={false}
                            className={"!h-8"}
                            inputReadOnly={true}
                        />
                    </div>
                    <div className="datepicker-wrapper">
                        <label htmlFor="endDate" className="datepicker-label">
                            End Date
                        </label>
                        <DatePicker
                            id="endDate"
                            defaultValue={endDate}
                            format={"DD-MM-YYYY"}
                            onChange={(value) => setEndDate(value)}
                            disabledDate={(date) =>
                                !date || date.isBefore(startDate)
                            }
                            allowClear={false}
                            className={"!h-8"}
                            inputReadOnly={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DBHeader;
