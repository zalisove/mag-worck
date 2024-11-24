import {UserInputItem} from "./UserInputItem/UserInputItem";
import {Button, Container} from '@chakra-ui/react'
import {useSelector, useDispatch} from "react-redux";
import React from "react";
import {addNew as addNewUserInput} from "../../store/slice/userInputSlice";
import {addNew as addNewOutput} from "../../store/slice/outputSlice";

const UserInputSection = () => {

    const userInput = useSelector((state) => state.userInput);
    const dispatch = useDispatch()

    const startMotor = () => {
        dispatch(addNewOutput())
        dispatch(addNewUserInput())
    };

    return (
        <Container height="100%" overflow="auto" maxWidth="full" padding="2px">
            {userInput.map(item => <UserInputItem data={item}/>)}
            <Container width="full" maxWidth="full" display="flex" justifyContent="flex-end" marginTop="5px">
                <Button colorScheme='teal' variant='solid' onClick={startMotor} >
                    + Add new
                </Button>
            </Container>
        </Container>
    );
}

export default UserInputSection;