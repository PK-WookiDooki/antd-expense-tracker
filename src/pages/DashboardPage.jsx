import { useState } from "react";
import { DBHeader, DBRecords } from "../features";
import dayjs from "dayjs";
import { FloatingBtn } from "../components";
import { useGetAllRecordsQuery } from "../features/records/recordsApi";
import { useSelector } from "react-redux";

const DashboardPage = () => {
    const { token } = useSelector((state) => state.authSlice);

    const [startDate, setStartDate] = useState(dayjs().startOf("months"));
    const [endDate, setEndDate] = useState(dayjs().endOf("months"));

    const dateString = new URLSearchParams({
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
    }).toString();

    const { data: recordsList } = useGetAllRecordsQuery({
        token,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
    });

    return (
        <section className="flex flex-col gap-6">
            <DBHeader
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <DBRecords recordsList={recordsList} dateString={dateString} />
            <FloatingBtn />
        </section>
    );
};

export default DashboardPage;
