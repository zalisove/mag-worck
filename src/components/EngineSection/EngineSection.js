import EngineItem from "./EngineItem/EngineItem";
import {SimpleGrid} from "@chakra-ui/react";

function EngineSection() {
    return (
        <SimpleGrid minChildWidth='300px' spacing='2px' height="100%" overflow="auto" maxWidth="full" padding="2px">
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
            <EngineItem/>
        </SimpleGrid >
    );
}

export default EngineSection
;