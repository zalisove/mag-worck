import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const StepMotor = ({ data }) => {
    const [motorAngle, setMotorAngle] = useState(0);  // Поточний кут двигуна
    const [lastOC0A, setLastOC0A] = useState(data.OC0A); // Зберігаємо попереднє значення OC0A
    const motorSteps = 200;  // Кількість кроків на один оберт двигуна
    const stepAngle = 360 / motorSteps;  // Кут повороту на один крок

    // Стейт плеєра
    const playerState = useSelector((state) => state.player);

    // Ефект для відстеження зміни OC0A
    useEffect(() => {
        // Якщо значення OC0A змінюється з 0 на 1, робимо крок
        if (lastOC0A === 1 && data.OC0A === 0 && !playerState.stop) {
            setMotorAngle(prevAngle => (prevAngle + stepAngle) % 360); // Робимо крок
        }
        setLastOC0A(data.OC0A); // Оновлюємо попереднє значення OC0A для наступного циклу
    }, [data.OC0A, lastOC0A, stepAngle, playerState.stop]);

    // Ефект для скидання кута двигуна при стані stop
    useEffect(() => {
        if (playerState.stop) {
            setMotorAngle(0);  // Скидаємо кут до початкового значення
        }
    }, [playerState.stop]);

    return (
        <Flex direction="column" align="center" justify="center" p={5}>
            {/* Двигун */}
            <Box position="relative" width="200px" height="200px" border="5px solid black" borderRadius="50%" mb={5}>
                <Box
                    position="absolute"
                    top="calc(50% - 50px)"
                    left="50%"
                    width="0"
                    height="0"
                    borderLeft="5px solid transparent"
                    borderRight="5px solid transparent"
                    borderBottom="100px solid red"
                    transform={`translate(-50%, -50%) rotate(${motorAngle}deg)`}
                    transformOrigin="bottom center"
                    borderRadius="50%"
                />
                <Box
                    position="absolute"
                    top="calc(50% - 5px)"
                    left="calc(50% - 5px)"
                    width="10px"
                    height="10px"
                    background="black"
                    borderRadius="50%"
                />
            </Box>

            <Text fontSize="lg" mb={3}>
                Кут: {motorAngle.toFixed(2)}°
            </Text>
        </Flex>
    );
};

export default StepMotor;
