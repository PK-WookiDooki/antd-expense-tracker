import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { formatCurrency } from "../../core/functions/formatData";
import { useGetUserDataQuery } from "../auth/userApi";
import { useSelector } from "react-redux";

const DBHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
    const { token } = useSelector((state) => state.authSlice);
    const { data: userData } = useGetUserDataQuery(token);
    const balance = parseInt(userData?.balance);
    const formattedAmount = formatCurrency(balance);

    return (
        <section className="relative rounded-2xl overflow-hidden z-0 ">
            <div className="bg-primaryGreen absolute top-0 left-0 w-full h-full -z-[1] overflow-hidden">
                <span className="tan-blk"></span>
                <span className="purple-blk"></span>
                <span className="orange-blk"></span>
                <span className="blue-blk"></span>
            </div>

            <div className=" flex flex-col md:flex-row justify-between text-white p-4 lg:p-10 md:p-5 md:items-center gap-4">
                {/* balance */}
                <div className="w-full lg:w-auto">
                    <p className="text-xl mb-2">Account Balance</p>
                    <h2 className="text-4xl md:text-3xl font-medium lg:mb-8 md:mb-6 mb-4 ">
                        {" "}
                        {formattedAmount}
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base ">
                        {" "}
                        &ldquo; Your financial compass: The Main Balance – your
                        central hub <br className="lg:block hidden" /> for
                        tracking and managing expenses effortlessly. &rdquo;
                    </p>
                </div>
                <span className=" md:w-[1px] w-full h-[1px] md:h-auto bg-whiteGray block md:self-stretch"></span>
                <div className="flex items-center lg:gap-9 gap-4 md:p-6 p-3 rounded-md bg-black/30 w-full lg:w-auto">
                    <div className="w-full md:w-min-w-[155px]">
                        <label
                            htmlFor="startDate"
                            className="text-sm block mb-1 "
                        >
                            Start Date
                        </label>
                        <DatePicker
                            id="startDate"
                            defaultValue={dayjs().startOf("months")}
                            format={"DD MMMM YYYY"}
                            onChange={(value) => setStartDate(value)}
                            disabledDate={(date) =>
                                !date || date.isAfter(endDate)
                            }
                            allowClear={false}
                        />
                    </div>
                    <div className="w-full md:w-min-w-[155px]">
                        <label
                            htmlFor="endDate"
                            className="text-sm block mb-1 "
                        >
                            End Date
                        </label>
                        <DatePicker
                            id="endDate"
                            defaultValue={dayjs().endOf("months")}
                            format={"DD MMMM YYYY"}
                            onChange={(value) => setEndDate(value)}
                            disabledDate={(date) =>
                                !date || date.isBefore(startDate)
                            }
                            allowClear={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DBHeader;
