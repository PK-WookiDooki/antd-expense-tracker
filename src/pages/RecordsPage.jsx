import { useLocation } from "react-router-dom";
import { FloatingBtn, Loader } from "../components";
import { RecordPageHeader, RecordsList } from "../features";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllRecordsQuery } from "../features/records/recordsApi";

const RecordsPage = () => {
    const { token } = useSelector((state) => state.authSlice);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const sDate = searchParams.get("startDate");
    const eDate = searchParams.get("endDate");
    const startedDate =
        sDate !== null ? dayjs(sDate) : dayjs().startOf("months");
    const endedDate = eDate !== null ? dayjs(eDate) : dayjs().endOf("months");
    const [startDate, setStartDate] = useState(startedDate);
    const [endDate, setEndDate] = useState(endedDate);

    const { data: records, isLoading: isRecordsLoading } =
        useGetAllRecordsQuery({
            token,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        });

    if (isRecordsLoading) {
        return <Loader />;
    }

    return (
        <section className=" lg:p-10 p-5 bg-white rounded-2xl flex flex-col gap-10 h-full ">
            <RecordPageHeader
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <RecordsList recordsList={records} />
            <FloatingBtn />
        </section>
    );
};

export default RecordsPage;
