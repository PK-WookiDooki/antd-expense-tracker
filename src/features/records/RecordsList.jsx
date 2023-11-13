import {Select} from "antd";
import {NoRecords, RecordCard} from "..";
import useFormatRecords from "@/features/records/hooks/useFormatRecords.jsx";


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

const RecordsList = ({recordsList, selectedOpt, setSelectedOpt, isASC, setIsASC}) => {
    const records = useFormatRecords(recordsList, isASC)

    return (
        <section className="h-full flex flex-col ">
            <div className="flex items-center justify-between md:mb-9 mb-5 text-black">
                <h2 className="transitions-tlt ">
                    Transactions
                </h2>

                <div className="flex items-center md:gap-3 gap-1">
                    <button
                        onClick={() => setIsASC(!isASC)}
                        className=" h-8 aspect-square bg-white border border-cD9 rounded-sm "
                    >
                        {" "}
                        <i className="material-symbols-rounded text-xl flex items-center justify-center ">
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
                <div className="flex flex-col gap-1">
                    {records?.map((record) => (
                        <RecordCard record={record} key={record.id}/>
                    ))}
                </div>
            ) : (
                <NoRecords/>
            )}
        </section>
    );
};

export default RecordsList;
