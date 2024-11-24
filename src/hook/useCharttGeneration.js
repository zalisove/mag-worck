import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";
import { useDispatch } from "react-redux";
import { stop as stopAction } from '../store/slice/playerSlice'; // Додамо екшн для зупинки
import { pause as pauseAction } from '../store/slice/playerSlice';
import {updateItem} from "../store/slice/outputSlice"; // Додамо екшн для зупинки

export const useChartGeneration = (id) => {
    const userInput = useSelector((state) => state.userInput);
    const output = useSelector((state) => state.output);
    const playerState = useSelector((state) => state.player); // Отримуємо стан плеєра
    const dispatch = useDispatch(); // Для виклику екшнів

    // Отримуємо значення TCCRnA, TCCRnB з входу
    const currentUserInputIndex = userInput.findIndex(item => item.id === id)
    const TCCRnA = userInput[currentUserInputIndex]?.body?.TCCRnA || [false, false, false, false, false, false, false, false];
    const TCCRnB = userInput[currentUserInputIndex]?.body?.TCCRnB || [false, false, false, false, false, false, false, false];

    const currentOutputIndex = output.findIndex(item => item.id === id)

    // Ініціалізація початкових значень для OC0A, OC0B та TCNT0
    const initialOC0A = output[currentOutputIndex].OC0A ; // Початкове значення OC0A
    const initialTCNT0 = 0; // Початкове значення TCNT0

    const [data, setData] = useState({
        labels: ["0"], // Початкове значення для осі X
        datasets: [
            {
                label: 'TCNTn',
                data: [initialTCNT0],
                borderColor: "rgba(53, 162, 235, 0.5)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                stepped: true,
            },
            {
                label: 'OCnA',
                data: [initialOC0A ? 'ON' : 'OFF'],
                borderColor: "rgba(53, 162, 0, 0.5)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                stepped: true,
                yAxisID: 'y2',
            },
        ]
    });

    const [options, setOptions] = useState({
        maintainAspectRatio: false,
        responsive: true,
        animation: {
            duration: 100,
            easing: 'linear',
        },
        plugins: {
            title: {
                display: true,
                text: 'Timer/Counter Simulation',
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    mode: "x",
                    speed: 100
                },
                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 100
                }
            }
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                stack: 'demo',
                stackWeight: 2,
            },
            y2: {
                type: 'category',
                labels: ['ON', 'OFF'],
                offset: true,
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            }
        }
    });

    const calculateNextValues = (clockFrequency, TCCRnA, TCCRnB) => {
        const WGM02 = TCCRnB[4] ? 1 : 0;
        const WGM01 = TCCRnA[6] ? 1 : 0;
        const WGM00 = TCCRnA[7] ? 1 : 0;

        const COM0A1 = TCCRnA[0] ? 1 : 0;
        const COM0A0 = TCCRnA[1] ? 1 : 0;

        const CS00 = TCCRnB[7] ? 1 : 0;
        const CS01 = TCCRnB[6] ? 1 : 0;
        const CS02 = TCCRnB[5] ? 1 : 0;


        const calculatePrescaler = (CS02, CS01, CS00) => {
            let prescaler = 1;

            if (CS02 === 0 && CS01 === 0 && CS00 === 0) {
                return 0;
            } else if (CS02 === 0 && CS01 === 0 && CS00 === 1) {
                prescaler = 1;
            } else if (CS02 === 0 && CS01 === 1 && CS00 === 0) {
                prescaler = 8;
            } else if (CS02 === 0 && CS01 === 1 && CS00 === 1) {
                prescaler = 64;
            } else if (CS02 === 1 && CS01 === 0 && CS00 === 0) {
                prescaler = 256;
            } else if (CS02 === 1 && CS01 === 0 && CS00 === 1) {
                prescaler = 1024;
            }
            return prescaler;
        };

        const waveformMode = getWaveformGenerationMode(WGM02, WGM01, WGM00);
        const prescaler = calculatePrescaler(CS02, CS01, CS00)
        const timeDelta = 1 / (clockFrequency / prescaler)

        return (currentTime, OC0A, TCNT0, OCRA) => {
            let topValue = waveformMode.top === "OCRA" ? OCRA : waveformMode.top;

            let newTime = bigDecimal.add(currentTime, timeDelta);
            let newTCNT0 = (TCNT0 + 1) % (topValue + 1);

            let newOC0A = OC0A;

            // Обчислення для OC0A
            if (waveformMode.mode === "Normal") {
                if (newTCNT0 === OCRA) {
                    if (COM0A1 === 0 && COM0A0 === 1) {
                        newOC0A = OC0A === 0 ? 1 : 0;
                    } else if (COM0A1 === 1 && COM0A0 === 0) {
                        newOC0A = 0;
                    } else if (COM0A1 === 1 && COM0A0 === 1) {
                        newOC0A = 1;
                    }
                }
            } else if (waveformMode.mode === "Fast PWM") {
                if (WGM02 === 1 && COM0A1 === 0 && COM0A0 === 1) {
                    if (newTCNT0 === OCRA) {
                        newOC0A = OC0A === 0 ? 1 : 0;
                    }
                }
            } else if (waveformMode.mode === "PWM, Phase Correct") {
                if (WGM02 === 1 && COM0A1 === 0 && COM0A0 === 1) {
                    if (newTCNT0 === OCRA) {
                        newOC0A = OC0A === 0 ? 1 : 0;
                    }
                }
            }

            let TOVFlag = false;
            if (waveformMode.TOVFlagSetOn === "MAX" && newTCNT0 === topValue) {
                TOVFlag = true;
            } else if (waveformMode.TOVFlagSetOn === "BOTTOM" && newTCNT0 === 0) {
                TOVFlag = true;
            }


            dispatch(updateItem({ id, OC0A:newOC0A }));
            return {
                newTime: newTime,
                newOC0A: newOC0A,
                newTCNT0: newTCNT0,
                TOVFlag: TOVFlag
            };
        }

    };

    function bitsToDecimal(bits) {
        // Перевірка, що масив містить лише 0 і 1 (або true і false)
        if (!Array.isArray(bits) || bits.some(bit => bit !== 0 && bit !== 1 && bit !== false && bit !== true)) {
            throw new Error("Масив повинен містити лише значення 0 або 1 (false або true)");
        }

        // Конвертація true/false в 1/0, якщо потрібно
        const normalizedBits = bits.map(bit => bit === true ? 1 : bit === false ? 0 : bit);

        // Перетворення масиву бітів у рядок і конвертація в десяткове число
        const binaryString = normalizedBits.join('');
        return parseInt(binaryString, 2);
    }

    useEffect(() => {
        const clockFrequency = 16000000; // Частота процесора, наприклад 16 МГц
        const OCRA = bitsToDecimal(userInput[currentUserInputIndex]?.body?.OCRA); // Приклад значення для OCRA
        let currentTime = 0;
        let OC0A = initialOC0A;
        let TCNT0 = initialTCNT0;

        let interval;

        if (playerState.play) { // Якщо play, починаємо підрахунок
            let step = 0;
            const updateValues = calculateNextValues(clockFrequency, TCCRnA, TCCRnB);
            interval = setInterval(() => {
                const { newTime, newOC0A, newTCNT0 } = updateValues(currentTime, OC0A, TCNT0, OCRA);
                if(parseFloat(newTime) === 0 || step === userInput[currentUserInputIndex]?.body?.stepCount){
                    clearInterval(interval); // При pause зупиняємо підрахунок
                    return;
                }

                if (OC0A === 1 && newOC0A === 0 && !playerState.stop) {
                    step++; // Робимо крок
                }
                currentTime = newTime;
                OC0A = newOC0A;
                TCNT0 = newTCNT0;

                setData((oldValue) => {
                    const labels = [...oldValue.labels];
                    const newTimerData = [...oldValue.datasets[0].data];
                    const newOC0AData = [...oldValue.datasets[1].data];

                    // Додаємо перевірку, щоб уникнути `NaN`
                    const newLabel = !isNaN(newTime) ? bigDecimal.multiply(labels.length, newTime) : labels.length;

                    labels.push(newLabel);
                    newTimerData.push(newTCNT0);
                    newOC0AData.push(newOC0A ? 'ON' : 'OFF');

                    if (labels.length > 100) {
                        setOptions(oldOptions => ({
                            ...oldOptions,
                            scales: {
                                ...oldOptions.scales,
                                x: {
                                    min: labels.length - 100,
                                    max: labels.length,
                                }
                            }
                        }));
                    }

                    return {
                        labels: labels,
                        datasets: [
                            {
                                ...oldValue.datasets[0],
                                data: newTimerData,
                            },
                            {
                                ...oldValue.datasets[1],
                                data: newOC0AData,
                            },
                        ],
                    };
                });
            }, 100);
        }

        if (playerState.pause ) {
            clearInterval(interval); // При pause зупиняємо підрахунок
        }

        if (playerState.stop) { // При stop скидаємо дані
            clearInterval(interval);
            setData({
                labels: ["0"],
                datasets: [
                    {
                        label: 'TCNTn',
                        data: [initialTCNT0],
                        borderColor: "rgba(53, 162, 235, 0.5)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        stepped: true,
                    },
                    {
                        label: 'OCnA',
                        data: [initialOC0A ? 'ON' : 'OFF'],
                        borderColor: "rgba(53, 162, 0, 0.5)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        stepped: true,
                        yAxisID: 'y2',
                    },
                ]
            });
            currentTime = 0;
            OC0A = initialOC0A;
            TCNT0 = initialTCNT0;
            dispatch(stopAction()); // Скидаємо стан після зупинки
            dispatch(updateItem({ id, OC0A:initialOC0A }));
        }

        return () => {
            clearInterval(interval); // Очищаємо інтервал при розмонтаженні компонента
        };
    }, [playerState]); // Додаємо залежність від playerState

    return [data, options];
};

function getWaveformGenerationMode(WGM02, WGM01, WGM00) {
    if (WGM02 === 0 && WGM01 === 0 && WGM00 === 0) {
        return {
            mode: "Normal",
            top: 255, // 0xFF
            updateOfOCRxAt: "Immediate",
            TOVFlagSetOn: "MAX",
        };
    } else if (WGM02 === 0 && WGM01 === 0 && WGM00 === 1) {
        return {
            mode: "PWM, Phase Correct",
            top: 255, // 0xFF
            updateOfOCRxAt: "TOP",
            TOVFlagSetOn: "BOTTOM",
        };
    } else if (WGM02 === 0 && WGM01 === 1 && WGM00 === 0) {
        return {
            mode: "CTC",
            top: "OCRA",
            updateOfOCRxAt: "Immediate",
            TOVFlagSetOn: "MAX",
        };
    } else if (WGM02 === 0 && WGM01 === 1 && WGM00 === 1) {
        return {
            mode: "Fast PWM",
            top: 255, // 0xFF
            updateOfOCRxAt: "TOP",
            TOVFlagSetOn: "MAX",
        };
    } else if (WGM02 === 1 && WGM01 === 0 && WGM00 === 1) {
        return {
            mode: "PWM, Phase Correct",
            top: "OCRA",
            updateOfOCRxAt: "TOP",
            TOVFlagSetOn: "BOTTOM",
        };
    } else if (WGM02 === 1 && WGM01 === 1 && WGM00 === 1) {
        return {
            mode: "Fast PWM",
            top: "OCRA",
            updateOfOCRxAt: "BOTTOM",
            TOVFlagSetOn: "TOP",
        };
    }
}

