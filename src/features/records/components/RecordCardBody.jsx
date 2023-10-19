import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteRecordModal, EditRecordModal } from "../..";

const RecordCardBody = ({ record, isRemove, date }) => {
    const { type, recordId, userCategory, amount, description } = record;

    const formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "MMK",
    });

    const items = [
        {
            label: <EditRecordModal record={record} date={date} />,
            key: 1,
        },
        {
            label: <DeleteRecordModal record={record} />,
            key: 2,
            danger: true,
        },
    ];

    return (
        <div
            className={`flex items-center justify-between py-1 px-5 bg-white rounded-md `}
        >
            <div className="flex items-center gap-3">
                <span className=" aspect-square h-12 bg-primary rounded-md flex items-center justify-center bg-primaryBlue text-white ">
                    Icon
                </span>
                <div className="flex flex-col gap-1 text-dark">
                    <h2 className="md:text-xl font-medium capitalize">
                        {" "}
                        {userCategory}{" "}
                    </h2>
                    <p className="md:text-sm text-xs line-clamp-1  ">
                        {" "}
                        {description}{" "}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 record">
                <p
                    className={` min-w-max md:text-lg font-medium ${
                        type === "EXPENSE" ? "text-danger" : "text-primaryGreen"
                    } `}
                >
                    {" "}
                    {type === "EXPENSE"
                        ? `- ${formattedAmount}`
                        : formattedAmount}{" "}
                </p>
                {!isRemove ? (
                    <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <button className="text-xl text-dark">
                            {" "}
                            <BsThreeDotsVertical />{" "}
                        </button>
                    </Dropdown>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default RecordCardBody;
