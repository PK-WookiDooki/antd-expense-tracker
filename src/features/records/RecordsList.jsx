import { useSelector } from "react-redux";
import { Select } from "antd";
import { formatData } from "@/core/functions/formatData";
import { RecordCard } from "..";
import { useEffect, useState } from "react";
import useFormatRecords from "./hooks/useFormatRecords";

const options = [
    {
        label: "All",
        value: "ALL",
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

const RecordsList = ({ recordsList }) => {
    //const { recordsList } = useSelector((state) => state.recordsSlice);
    const [records, setRecords] = useState([]);
    const [isASC, setIsASC] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState("ALL");

    useEffect(() => {
        if (recordsList?.length) {
            setRecords(formatData(recordsList));
        }
    }, [recordsList]);

    useEffect(() => {
        if (selectedOpt === "ALL") {
            if (isASC) {
                setRecords(
                    records
                        .slice()
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                );
            } else {
                setRecords(formatData(recordsList));
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
        <section className="h-full flex flex-col">
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
            {records?.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {records?.map((record) => (
                        <RecordCard record={record} key={record.id} />
                    ))}
                </div>
            ) : (
                <div className=" flex-1   flex items-center justify-center">
                    {" "}
                    <h3 className="text-2xl font-medium text-lightGray">
                        There is no transactions for now!
                    </h3>{" "}
                </div>
            )}
        </section>
    );
};

export default RecordsList;
