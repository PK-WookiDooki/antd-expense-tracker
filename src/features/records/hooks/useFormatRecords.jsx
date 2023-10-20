import { useState, useEffect } from "react";

function useFormatRecords(recordsList) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const formatData = () => {
            const formattedData = recordsList.reduce((filteredArray, data) => {
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
                .sort((a, b) => new Date(b.date) - new Date(a.date));

            setResult(sortedResult);
        };

        formatData();
    }, [recordsList]);

    return result;
}

export default useFormatRecords;
