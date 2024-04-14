import {GraphsItem} from "./GraphsItem/GraphsItem";
import {Container} from "@chakra-ui/react";

export const  GraphsSection = () => {
    return (
        <Container height="100%" overflow="auto" maxWidth="full" padding="2px">
            <GraphsItem test="rgb(53, 60, 235)"/>
            <GraphsItem test="rgb(53, 162, 0)"/>
        </Container>
    );
}
