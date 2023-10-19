import { useSelector } from "react-redux";
import { Select } from "antd";
import { formatData } from "../../core/functions/formatData";
import { RecordCard } from "..";
import { useEffect, useState } from "react";

const options = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Expense",
        value: "EXPENSE",
    },
    {
        label: "Income",
        value: "INCOME",
    },
];

const RecordsList = () => {
    const { recordsList } = useSelector((state) => state.recordsSlice);
    const formattedRecords = formatData(recordsList);

    const [records, setRecords] = useState(formattedRecords);
    const [isASC, setIsASC] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState("all");

    useEffect(() => {
        if (selectedOpt === "all") {
            if (isASC) {
                setRecords(
                    formattedRecords
                        .slice()
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
                );
            } else {
                setRecords(formatData(filteredRecords));
            }
        }
    }, [selectedOpt, isASC]);

    return (
        <section>
            <div className="flex items-center justify-between mb-9 text-black">
                <h2 className="md:text-2xl text-lg font-semibold text-primary text-lightGray">
                    Transactions
                </h2>

                <div className="flex items-center gap-3">
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
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {records?.map((record) => (
                    <RecordCard record={record} key={record.id} />
                ))}
            </div>
        </section>
    );
};

export default RecordsList;
