import {GraphsItem} from "./GraphsItem/GraphsItem";
import {Container} from "@chakra-ui/react";

export const  GraphsSection = () => {
    return (
        <Container height="100%" overflow="auto" maxWidth="full" padding="2px">
            <GraphsItem test="TEST_1  "/>
            <GraphsItem test="TEST_2  "/>
        </Container>
    );
}
