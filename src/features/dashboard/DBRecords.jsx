import { formatData } from "@/core/functions/formatData";
import { RecordCard } from "..";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DBRecords = ({ recordsList, dateString }) => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if (recordsList) {
            setRecords(formatData(recordsList).slice(0, 3));
        }
    }, [recordsList]);

    return (
        <section className=" p-4 md:p-10 bg-whiteGray rounded-2xl">
            <div className="flex items-center justify-between md:mb-9 mb-5 text-black">
                <h2 className="md:text-2xl text-lg font-semibold text-primary text-lightGray">
                    Transactions
                </h2>
            </div>

            {records?.length > 0 ? (
                <div className=" flex flex-col gap-2 ">
                    {records?.map((record) => (
                        <RecordCard key={record?.id} record={record} />
                    ))}
                </div>
            ) : (
                <div className=" h-full flex items-center justify-center">
                    {" "}
                    <h3 className="text-2xl font-medium text-lightGray">
                        There is no transactions for now!
                    </h3>{" "}
                </div>
            )}

            {formatData(recordsList)?.length > 3 ? (
                <div className={`flex justify-end mt-6`}>
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
            ) : (
                ""
            )}
        </section>
    );
};

export default DBRecords;
