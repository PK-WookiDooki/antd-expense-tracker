import { useSelector } from "react-redux";
import { formatData } from "../../core/functions/formatData";
import { RecordCard } from "..";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Select } from "antd";

const options = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "EXPENSE",
        value: "EXPENSE",
    },
    { label: "INCOME", value: "INCOME" },
];

const DBRecords = ({ dateString }) => {
    const { recordsList } = useSelector((state) => state.recordsSlice);
    const formattedRecords = formatData(recordsList).slice(0, 3);
    const [isASC, setIsASC] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState("all");
    const [records, setRecords] = useState(formattedRecords);

    useEffect(() => {
        if (selectedOpt === "all") {
            if (isASC) {
                setRecords(
                    formattedRecords
                        .slice(0, 3)
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                );
            } else {
                setRecords(formattedRecords);
            }
        } else {
            const filteredRecords = recordsList?.filter(
                (record) => record.type === selectedOpt
            );
            if (isASC) {
                setRecords(
                    formatData(filteredRecords)
                        .slice()
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 3)
                );
            } else {
                setRecords(formatData(filteredRecords).slice(0, 3));
            }
        }
    }, [selectedOpt, isASC]);

    return (
        <section className=" p-4 md:p-10 bg-whiteGray rounded-2xl">
            <div className="flex items-center justify-between md:mb-9 mb-5 text-black">
                <h2 className="md:text-2xl text-lg font-semibold text-primary text-lightGray">
                    Transactions
                </h2>

                {/*<div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsASC(!isASC)}
                        className=" w-10 h-10 bg-white border border-gray rounded-md "
                    >
                        {" "}
                        <i className="material-symbols-outlined text-2xl  ">
                            swap_vert
                        </i>
                    </button>
                    <Select
                        defaultValue={selectedOpt}
                        options={options}
                        onChange={(value) => setSelectedOpt(value)}
                        className=" !w-32 !h-10  rounded-md"
                    />
                </div>*/}
            </div>

            <div className=" flex flex-col gap-2 ">
                {records?.map((record) => (
                    <RecordCard key={record?.id} record={record} />
                ))}
            </div>
            <div className=" flex justify-end mt-6">
                <Link
                    to={{
                        pathname: "/records",
                        search: `?${dateString}`,
                    }}
                    className="text-[#20C] hover:text-[#20C]/80 duration-200"
                >
                    {" "}
                    See more . . .
                </Link>
            </div>
        </section>
    );
};

export default DBRecords;
