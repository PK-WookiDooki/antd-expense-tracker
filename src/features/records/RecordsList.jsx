import { Select } from "antd";
import { formatData } from "@/core/functions/formatData";
import {NoRecords, RecordCard} from "..";
import { useEffect, useState } from "react";


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
        if (recordsList?.length > 0) {
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
        <section className="h-full flex flex-col ">
            <div className="flex items-center justify-between md:mb-9 mb-4 text-black">
                <h2 className="transitions-tlt ">
                    Transactions
                </h2>

                <div className="flex items-center md:gap-3 gap-1">
                    <button
                        onClick={() => setIsASC(!isASC)}
                        className=" h-8 aspect-square bg-white border border-gray rounded-sm "
                    >
                        {" "}
                        <i className="material-symbols-outlined text-xl flex items-center justify-center ">
                            swap_vert
                        </i>
                    </button>
                    <Select
                        defaultValue={selectedOpt}
                        options={options}
                        onChange={(value) => setSelectedOpt(value)}
                        className=" !w-32 !h-8 "
                    />
                </div>
            </div>
            {records?.length > 0 ? (
                <div className="flex flex-col md:gap-2 gap-1">
                    {records?.map((record) => (
                        <RecordCard record={record} key={record.id} />
                    ))}
                </div>
            ) : (
               <NoRecords/>
            )}
        </section>
    );
};

export default RecordsList;
