import RecordCardBody from "./RecordCardBody";
import RecordCardDate from "./RecordCardDate";

const RecordCard = ({ record }) => {
    return (
        <section className="flex flex-col gap-1">
            <RecordCardDate record={record} />
            {record?.data?.map((item, index) => (
                <RecordCardBody key={index} record={item} date={record?.date} />
            ))}
        </section>
    );
};

export default RecordCard;
