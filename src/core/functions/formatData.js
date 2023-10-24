export const formatData = (allData) => {
    const formattedData = [];
    allData.forEach((data) => {
        const { id, createdDate, description, userCategory, type, amount } =
            data;

        if (!formattedData[createdDate]) {
            formattedData[createdDate] = [];
        }
        formattedData[createdDate].push({
            recordId: id,
            amount,
            type,
            userCategory,
            description,
        });
    });

    const result = Object.keys(formattedData)
        .map((createdDate, index) => ({
            id: index + 1,
            date: createdDate,
            data: formattedData[createdDate],
        }))
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
};

export const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "MMK",
    });

    return formattedAmount;
};

export const formatChartData = (recordsList, type) => {
    const filteredData = recordsList
        ?.filter((record) => record.type === type)
        .reduce((result, item) => {
            const existingItem = result.find(
                (category) =>
                    category.name.toLowerCase() ===
                    item.userCategory.name.toLowerCase()
            );
            if (existingItem) {
                existingItem.value += item.amount;
            } else {
                result.push({
                    type:
                        item.userCategory.name.chartAt(0).toUpperCase() +
                        item.userCategory.name.slice(1),
                    value: item.amount,
                    color: item.userCategory.iconBgColor,
                });
            }
        });
    return filteredData;
};
