import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

import {Container} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import {useSelector} from "react-redux";

const options = {
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
            },
            pan: {
                enabled: true,
                mode: "x",
            }
        }
    }, scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 1,
            ticks: {
                stepSize: 1
            },
        },
        x: {
            min: 0,
            max: 100
        }
    }
};


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    zoomPlugin,
);


export const GraphsItem = (props) => {

    const chartRef = useRef(null)
    const isPlay = useSelector((state) => state.player.play)
    const isPause = useSelector((state) => state.player.pause)
    const isStop = useSelector((state) => state.player.stop)

    const [data, setData] = useState({
        labels: [0],
        datasets: [
            {
                data: [0],
                borderColor: props.test,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                stepped: true,
            },
        ],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPause && chartRef && chartRef.current) {
                const chart = chartRef.current;

                const labels = [...data.labels, parseInt(data.labels.slice(-1)) + 1];
                const newData = [
                    ...data.datasets[0].data,
                    Math.floor(Math.random() * 2),
                ];

                if (labels.length > 100) {
                    chart.options.scales.x.min = labels.length - 100;
                    chart.options.scales.x.max = labels.length;
                }

                if (labels.length === 200) {
                    clearInterval(interval);
                }

                setData({
                    labels: labels,
                    datasets: [
                        {
                            ...data.datasets[0],
                            data: newData,
                        },
                    ],
                });

                chart.update();
            }
        }, 100);

        if (isStop){
            setData({
                labels: [0],
                datasets: [
                    {
                        data: [0],
                        borderColor: props.test,
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        stepped: true,
                    },
                ],
            });
        }

        return () => {
            clearInterval(interval);
        };
    }, [isStop,isPause, data]);

    return (
        <Container borderWidth="1px" maxWidth={"100%"} borderRadius="md" padding="5px" marginTop="5px">
            <Line ref={chartRef} width={"100%"} options={options} data={data}/>
        </Container>
    );
}

