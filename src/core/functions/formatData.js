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
