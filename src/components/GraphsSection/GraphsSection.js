import {GraphsItem} from "./GraphsItem/GraphsItem";
import {Container} from "@chakra-ui/react";
import React from "react";
import {useSelector} from "react-redux";

export const  GraphsSection = () => {
    const userInput = useSelector((state) => state.userInput);

    return (
        <Container height="100%" overflow="auto" maxWidth="full" padding="2px">
            {userInput.map(item => <GraphsItem data={item}/>)}
        </Container>
    );
}
