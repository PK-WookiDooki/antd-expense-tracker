import {useEffect, useState} from "react";

export const useFormatCurrency = (amount = 0) => {
    const [result, setResult] = useState("0");

    useEffect(() => {
        if (amount?.toString().length > 0) {
            const formattedAmount = amount.toLocaleString("en-US", {
                style: "currency",
                currency: "MMK",
            });
            setResult(formattedAmount)
        }
    }, [amount]);

    return result;
}