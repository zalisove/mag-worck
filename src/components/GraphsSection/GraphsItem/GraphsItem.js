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
import zoomPlugin from "chartjs-plugin-zoom";
import {useChartGeneration} from "../../../hook/useCharttGeneration";




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

    const [data, options] = useChartGeneration()

    return (
        <Container borderWidth="1px" maxWidth={"100%"} borderRadius="md" padding="5px" marginTop="5px" height={300}>
            <Line width={"100%"} options={options} data={data}/>
        </Container>
    );
}

