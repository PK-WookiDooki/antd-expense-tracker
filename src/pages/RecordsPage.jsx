import {useLocation} from "react-router-dom";
import {FloatingBtn, Loader} from "../components";
import {RecordPageHeader, RecordsList} from "../features";
import dayjs from "dayjs";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useGetAllRecordsQuery} from "../features/records/recordsApi";

const RecordsPage = () => {
    const {token} = useSelector((state) => state.authSlice);

    const [selectedOpt, setSelectedOpt] = useState("ALL");
    const [isASC, setIsASC] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const sDate = searchParams.get("startDate");
    const eDate = searchParams.get("endDate");
    const startedDate =
        sDate !== null ? dayjs(sDate) : dayjs().startOf("months");
    const endedDate = eDate !== null ? dayjs(eDate) : dayjs().endOf("months");
    const [dates, setDates] = useState({
        startDate: startedDate,
        endDate: endedDate
    })

    const {data: records, isLoading: isRecordsLoading, isFetching: isRecordsFetching} =
        useGetAllRecordsQuery({
            token,
            startDate: dates.startDate.format("YYYY-MM-DD"),
            endDate: dates.endDate.format("YYYY-MM-DD"),
            keyword: selectedOpt,
        });

    if (isRecordsLoading || isRecordsFetching) {
        return <Loader/>;
    }

    return (
        <section className=" lg:p-10 md:p-5 p-4 rounded-2xl flex flex-col gap-6 h-full bg-cFA">
            <RecordPageHeader
                dates={dates}
                setDates={setDates}
            />
            <RecordsList recordsList={records} selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt} isASC={isASC}
                         setIsASC={setIsASC}/>
            <FloatingBtn/>
        </section>
    );
};

export default RecordsPage;
