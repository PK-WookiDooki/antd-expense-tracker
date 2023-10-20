import { Pie, measureTextWidth } from "@ant-design/plots";
import "./chart.css";

const PieChart = ({ chartData, dataColor, chartTitle, extraStyle }) => {
    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(
            text,
            style
        );
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(
                Math.sqrt(
                    Math.abs(
                        Math.pow(R, 2) /
                            (Math.pow(textWidth / 2, 2) +
                                Math.pow(textHeight, 2))
                    )
                ),
                1
            );
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
            scale < 1 ? 1 : "inherit"
        };">${text}</div>`;
    }

    const data = [
        { type: "Food", value: 10 },
        { type: "Bill", value: 15 },
        { type: "Car", value: 8 },
        { type: "Transportation", value: 12 },
        { type: "Salary", value: 20 },
    ];

    const customColorPalette = [
        "#FF5733",
        "#0077B6",
        "#FFC300",
        "#00A6ED",
        "#1DB954",
    ];

    const config = {
        appendPadding: 10,
        data: chartData,
        angleField: "value",
        colorField: "type",
        color: dataColor,
        radius: 1,
        innerRadius: 0.65,
        legend: {
            position: "bottom",
            itemName: {
                style: {
                    fontSize: 16,
                    fontFamily: "Roboto",
                },
            },
            marker: {
                symbol: "circle",
                style: {
                    r: 8,
                },
            },
        },
        meta: {
            value: {
                formatter: (v) => ` MMK ${v}`,
            },
        },
        label: {
            type: "inner",
            offset: "-50%",
            style: {
                textAlign: "center",
                fontSize: 14,
            },
            autoRotate: false,
            content: "{percentage}",
        },
        statistic: {
            title: {
                offsetY: -4,
                style: {
                    fontSize: "20px",
                },
                customHtml: (container, view, item) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(
                        Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
                    );
                    const text = item ? item.type : "Total";
                    return renderStatistic(d, text);
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontWeight: 500,
                    fontSize: 20,
                },
                customHtml: (container, view, item, data) => {
                    const { width } = container.getBoundingClientRect();
                    const text = item
                        ? `MMK ${item.value}`
                        : `MMK ${data.reduce((r, d) => r + d.value, 0)}`;
                    return renderStatistic(width, text);
                },
            },
        },
        interactions: [
            {
                type: "element-selected",
            },
            {
                type: "element-active",
            },
            {
                type: "pie-statistic-active",
            },
        ],
    };
    return (
        <div
            className={`w-full lg:max-w-[480px]  bg-pieBg p-5 rounded-xl shadow-sm ${extraStyle} `}
        >
            <h2 className="text-black text-center text-2xl font-semibold">
                {" "}
                {chartTitle}{" "}
            </h2>
            <Pie {...config} />
        </div>
    );
};

export default PieChart;
