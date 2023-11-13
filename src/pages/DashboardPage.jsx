import {useState} from "react";
import {DBCharts, DBHeader, DBRecords} from "../features";
import dayjs from "dayjs";
import {FloatingBtn, Loader} from "../components";
import {useGetAllRecordsQuery} from "../features/records/recordsApi";
import {useSelector} from "react-redux";

const DashboardPage = () => {
    const {token} = useSelector((state) => state.authSlice);

    const [startDate, setStartDate] = useState(dayjs().startOf("months"));
    const [endDate, setEndDate] = useState(dayjs().endOf("months"));

    const dateString = new URLSearchParams({
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
    }).toString();

    const {data: recordsList, isLoading: isRecordsLoading, isFetching: isRecordsFetching} =
        useGetAllRecordsQuery({
            token,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            keyword: "ALL"
        });

    // console.log(recordsList, error)

    if (isRecordsLoading || isRecordsFetching) {
        return <Loader/>;
    }

    return (
        <section className="flex flex-col md:gap-6 gap-4">

            <DBHeader
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <DBCharts recordsList={recordsList}/>
            <DBRecords recordsList={recordsList} dateString={dateString}/>
            <FloatingBtn/>
        </section>
    );
};

export default DashboardPage;
