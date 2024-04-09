import {Center, Container, Image} from "@chakra-ui/react";

function EngineItem() {
    return (
        <Container borderWidth="1px" borderRadius="md" padding="5px" marginTop="5px" width={300} height={300} >
            <Center  h='100%'>
                <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTq0z-qW7CwDMxrbJlywUqHfrIWrnnr1Ruxg&s"}/>
            </Center>
        </Container>
    );
}

export default EngineItem
;