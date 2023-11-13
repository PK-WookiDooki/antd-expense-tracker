import {NoRecords, RecordCard} from "..";
import {DatePicker} from "antd";
import useFormatRecords from "@/features/records/hooks/useFormatRecords.jsx";

const ExpenseRecords = ({
                            selectedMonth,
                            setSelectedMonth,
                            isASC, setIsASC,
                            expensesList,
                            userBudget,
                        }) => {

    const expenseRecords = useFormatRecords(expensesList, isASC);

    // console.log(expenseRecords)

    return (
        <section className="lg:p-10 md:p-5 p-4 rounded-2xl bg-cFA flex flex-col md:gap-9 gap-3  h-full">
            <div className="flex items-center justify-between">
                <h2 className="transitions-tlt"> Transactions </h2>
                <div className="flex items-center gap-2 ">
                    <button
                        onClick={() => setIsASC(!isASC)}
                        className=" !h-8 aspect-square border border-cD9 rounded-sm bg-white flex items-center justify-center"
                    >
                        {" "}
                        <i className="material-symbols-rounded text-xl ">
                            swap_vert
                        </i>{" "}
                    </button>
                    <DatePicker.MonthPicker
                        defaultValue={selectedMonth}
                        format={"MMMM YYYY"}
                        onChange={(value) => setSelectedMonth(value)}
                        className=" md:!w-60 !h-8 "
                        allowClear={false}
                        inputReadOnly={true}
                    />
                </div>
            </div>

            {expenseRecords?.length > 0 && userBudget > 0 ? (
                <div className="flex flex-col gap-1">
                    {expenseRecords?.map((record) => (
                        <RecordCard key={record?.id} record={record}/>
                    ))}
                </div>
            ) : (
                <NoRecords month={selectedMonth.format("MMMM")}/>
            )}
        </section>
    );
};

export default ExpenseRecords;
