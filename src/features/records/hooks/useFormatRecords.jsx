import {useState, useEffect} from "react";
import dayjs from "dayjs";

function useFormatRecords(recordsList, isASC = false) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (recordsList?.length > 0) {
            const formattedData = recordsList?.reduce((filteredArray, data) => {
                const {
                    id,
                    createdDate,
                    description,
                    userCategory,
                    type,
                    amount,
                } = data;

                if (!filteredArray[createdDate]) {
                    filteredArray[createdDate] = [];
                }

                filteredArray[createdDate].push({
                    recordId: id,
                    amount,
                    type,
                    userCategory,
                    description,
                });

                return filteredArray;
            }, {});

            const sortedResult = Object.keys(formattedData)
                .map((createdDate, index) => ({
                    id: index + 1,
                    date: createdDate,
                    data: formattedData[createdDate],
                }))
                .sort((a, b) => dayjs(b.date) - dayjs(a.date));

            if (isASC) {
                const formattedResult = sortedResult?.slice().sort((a, b) => dayjs(a.date) - dayjs(b.date));
                setResult(formattedResult)
            } else {
                setResult(sortedResult);
            }
        }
    }, [recordsList, isASC]);


    return result;
}

export default useFormatRecords;
