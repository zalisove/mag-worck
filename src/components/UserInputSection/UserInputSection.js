import {UserInputItem} from "./UserInputItem/UserInputItem";
import {Container} from '@chakra-ui/react'
import {useSelector} from "react-redux";

const UserInputSection = () => {

    const userInput = useSelector((state) => state.userInput);

    return (
        <Container height="100%" overflow="auto" maxWidth="full" padding="2px">
            {userInput.map(item => <UserInputItem data={item}/>)}
        </Container>
    );
}

export default UserInputSection;