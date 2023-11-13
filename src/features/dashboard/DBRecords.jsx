import {NoRecords, RecordCard} from "..";
import {Link} from "react-router-dom";
import useFormatRecords from "@/features/records/hooks/useFormatRecords.jsx";

const DBRecords = ({recordsList, dateString}) => {
    const records = useFormatRecords(recordsList, false)

    return (
        <section className=" p-4 md:p-5 lg:p-10 bg-cFA rounded-2xl">
            <h2 className="transitions-tlt md:mb-8 mb-5">
                Transactions
            </h2>
            {records?.length > 0 ? (
                <div className=" flex flex-col gap-1 ">
                    {records?.slice(0, 3).map((record) => (
                        <RecordCard key={record?.id} record={record}/>
                    ))}
                </div>
            ) : (
                <NoRecords/>
            )}

            {records?.length > 3 ? (
                <div className={`flex justify-end mt-6`}>
                    <Link
                        to={{
                            pathname: "/transactions",
                            search: `?${dateString}`,
                        }}
                        className="text-[#1A73EC] hover:text-[#1A73EC]/80 duration-200 text-sm md:text-base flex items-center gap-2 font-medium"
                    >
                        {" "}
                        See more <span className="material-symbols-rounded text-base">
arrow_forward_ios
</span>
                    </Link>
                </div>
            ) : (
                ""
            )}
        </section>
    );
};

export default DBRecords;
