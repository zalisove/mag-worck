import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Switch,
    Container, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../../store/slice/userInputSlice';

export const UserInputItem = ({ data }) => {
    const dispatch = useDispatch();
    const { id, body } = data;
    const { bitCount, stepCount } = body;

    const onSwitch = (register, index, isChecked) => {
        const updatedValues = {
            [register]: [...body[register].slice(0, index), isChecked, ...body[register].slice(index + 1)],
        };
        dispatch(updateItem({ id, updatedValues }));
    };

    const stepCountOnChange = (valueString) => {
        const updatedValues = {
            stepCount: parseInt(valueString)
        };
        dispatch(updateItem({ id, updatedValues}));
    }

    const renderSwitches = (register) => {
        return body[register].map((item, index) => (
            <Td key={index}>
                <Switch isDisabled={item === null} isChecked={item} onChange={(e) => onSwitch(register, index, e.target.checked)} />
            </Td>
        ));
    };

    const renderBits = () => {
        return Array.from({ length: bitCount }, (_, index) => bitCount - index - 1).map((bit) => (
            <Th>Біт {bit}</Th>
        ));
    };

    return (
        <Container id={id} width="full" maxWidth="full">
            <TableContainer borderWidth="1px" borderRadius="md" padding="5px" marginTop="5px">
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Регістр</Th>
                            {renderBits()}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>TCCRnA</Td>
                            {renderSwitches('TCCRnA')}
                        </Tr>
                        <Tr>
                            <Td>TCCRnB</Td>
                            {renderSwitches('TCCRnB')}
                        </Tr>
                        <Tr>
                            <Td>OCRA</Td>
                            {renderSwitches('OCRA')}
                        </Tr>
                        <Tr>
                            <Td>Кількість кроків</Td>
                            <NumberInput size='sm' maxW={20} defaultValue={stepCount} min={0} onChange={stepCountOnChange}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};
