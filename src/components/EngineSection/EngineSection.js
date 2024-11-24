import {SimpleGrid} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import React from "react";
import StepMotor from "./StepMotor/StepMotor";

function EngineSection() {

    const output = useSelector((state) => state.output);

    return (
        <SimpleGrid minChildWidth='300px' spacing='2px' height="100%" overflow="auto" maxWidth="full" padding="2px">
            {output.map(item => <StepMotor data={item}/>)}
        </SimpleGrid >
    );
}

export default EngineSection
;