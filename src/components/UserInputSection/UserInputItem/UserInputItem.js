import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer, Switch,
} from '@chakra-ui/react'


function UserInputItem() {
    return (
        <TableContainer borderWidth="1px" borderRadius="md" padding="5px" marginTop="5px">
            <Table  size='sm'>
                <Thead>
                    <Tr>
                        <Th>Регістр</Th>
                        <Th>Біт 7</Th>
                        <Th>Біт 6</Th>
                        <Th>Біт 5</Th>
                        <Th>Біт 4</Th>
                        <Th>Біт 3</Th>
                        <Th>Біт 2</Th>
                        <Th>Біт 1</Th>
                        <Th>Біт 0</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>TCCRnA</Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                    </Tr>
                    <Tr>
                        <Td>TCCRnB </Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                        <Td>  <Switch/></Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default UserInputItem;