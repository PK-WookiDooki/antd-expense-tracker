import { useState, useEffect } from "react";

function useFilterData(recordsList, type) {
    const [filterRecords, setFilterRecords] = useState([]);

    useEffect(() => {
        if (recordsList) {
            const result = recordsList
                .filter((record) => record.type === type)
                .reduce((result, item) => {
                    const existingItem = result.find(
                        (category) =>
                            category.type.toLowerCase() ===
                            item.userCategory.name.toLowerCase()
                    );
                    if (existingItem) {
                        existingItem.value += item.amount;
                    } else {
                        result.push({
                            type:
                                item.userCategory.name.charAt(0).toUpperCase() +
                                item.userCategory.name.slice(1),
                            value: item.amount,
                            color: item.userCategory.iconBgColor,
                        });
                    }
                    return result; // Important: You should return the accumulator (result).
                }, []);

            setFilterRecords(result);
        }
    }, [recordsList]);

    return filterRecords;
}

export default useFilterData;
