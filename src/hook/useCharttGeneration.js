import {useEffect, useState} from "react";
import bigDecimal from "js-big-decimal";

export const useChartGeneration = () => {
    const [data, setData] = useState({
        labels: ["0"],
        datasets: [
            {
                label: 'Dataset 1',
                data: [0],
                borderColor: "rgba(53, 162, 235, 0.5)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                stepped: 'true',
            },
            {
                label: 'Dataset 2',
                data: ['OFF'],
                borderColor: "rgba(53, 162, 0, 0.5)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                stepped: 'true',
                yAxisID: 'y2',
            }
        ]
    });

    const [options, setOptions] = useState({
        maintainAspectRatio: false,
        responsive: true,
        animation: {
            duration: 100,
            easing: 'linear',
        },
        plugins: {
            title: {
                display: true,
                text: 'TEST',
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    mode: "x",
                    speed: 100
                },
                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 100
                }
            }
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                stack: 'demo',
                stackWeight: 2,
            },
            y2: {
                type: 'category',
                labels: ['ON', 'OFF'],
                offset: true,
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            }
        }
    });

    useEffect(() => {

        const interval = setInterval(() => {

            setData((oldValue) => {

                const labels = [...oldValue.labels];
                const newTimerData = [...oldValue.datasets[0].data];
                const newOC0xData = [...oldValue.datasets[1].data];

                const timeDelta = 1/16;

                if ((newOC0xData.length + 1) % 256 === 0) {
                    newOC0xData.push(newOC0xData[newOC0xData.length - 1] === 'OFF' ? 'ON' : 'OFF');
                } else {
                    newOC0xData.push(newOC0xData[newOC0xData.length - 1]);
                }
                newTimerData.push((newTimerData.length + 1) % 256)
                labels.push(bigDecimal.multiply(labels.length, timeDelta));


                if (labels.length > 100) {
                    setOptions(oldOptions => ({
                        ...oldOptions,
                        scales: {
                            ...oldOptions.scales,
                            x: {
                                min: labels.length - 100,
                                max: labels.length,
                            }
                        }
                    }));
                }

                if (labels.length > 300) {
                    clearInterval(interval);
                }

                return {
                    labels: labels,
                    datasets: [
                        {
                            ...oldValue.datasets[0],
                            data: newTimerData,
                        },
                        {
                            ...oldValue.datasets[1],
                            data: newOC0xData,
                        },
                    ],
                }
            });
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return [data, options];
};
