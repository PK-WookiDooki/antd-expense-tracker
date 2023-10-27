import {Pie, measureTextWidth} from "@ant-design/plots";
import "./chart.css";

const PieChart = ({chartData, dataColor, chartTitle, extraStyle}) => {
    function renderStatistic(containerWidth, text, style) {
        const {width: textWidth, height: textHeight} = measureTextWidth(
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

    const data = [{type: "Total", value: 0}];

    const customColorPalette = ["rgba(140,140,140, 0.5)"];

    const config = {
        appendPadding: 10,
        data: chartData?.length > 0 ? chartData : data,
        angleField: "value",
        colorField: "type",
        color: chartData?.length > 0 ? dataColor : customColorPalette,
        radius: 1,
        innerRadius: 0.65,
        legend:
            chartData?.length > 0
                ? {
                    position: "bottom",
                    itemHeight: 20,
                    itemName: {
                        style: {
                            fontSize: 16,
                            fontFamily: "Roboto",
                            fill: "#434343",
                            textBaseline: "middle"
                        },
                    },
                    marker: {
                        symbol: "circle",
                        style: {
                            r: 10,
                        },
                    },
                    pageNavigator: {
                        marker: {
                            style: {
                                inactiveFill: '#1C1B1F',
                                inactiveOpacity: 0.5,
                                fill: '#1C1B1F',
                                opacity: 0.8,
                                size: 18,
                            },
                        },
                        text: {
                            style: {
                                fill: '#000',
                                fontSize: 14,
                            },
                        },
                    }
                }
                : false,
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
            content: chartData?.length > 1 ? "{percentage}" : "",
        },
        statistic: {
            title: {
                offsetY: -4,
                style: {
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#434343"
                },
                customHtml: (container, view, item) => {
                    const {width, height} = container.getBoundingClientRect();
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
                    color: "#262626",
                },
                customHtml: (container, view, item, data) => {
                    const {width} = container.getBoundingClientRect();
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
            className={`w-full md:max-w-[480px]  bg-pieBg p-5 rounded-xl shadow-xl ${extraStyle} flex flex-col items-center `}
        >
            <h2 className="text-black md:text-2xl text-base font-medium mt-3 md:mt-0">
                {" "}
                {chartTitle}{" "}
            </h2>
            <Pie {...config} style={{width: "300px"}}/>
        </div>
    );
};

export default PieChart;
