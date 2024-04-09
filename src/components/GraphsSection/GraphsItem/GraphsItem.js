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
import {useEffect, useState} from "react";

const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'TEST',
        },
    },scales: {
        y: {
            ticks: {
                stepSize: 1
            }
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
);

const labels = ['0', '1', '2', '3', '4', '5', '6','7','8'];

const testData = {
    labels: labels,
    datasets: [
        {
            data: labels.map(() => Math.floor(Math.random() * 2)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            stepped: true,
        },
    ],
};


export const GraphsItem = (props) => {
    const [data, setData] = useState(testData);

    return (
        <Container borderWidth="1px" maxWidth={"100%"} borderRadius="md" padding="5px" marginTop="5px">
            <Line width={"100%"} options={options} data={data} />
        </Container>
    );
}

