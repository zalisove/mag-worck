import {Container, Icon, IconButton} from "@chakra-ui/react";
import {TbPlayerPlayFilled} from "react-icons/tb";
import {TbPlayerPauseFilled} from "react-icons/tb";
import {TbPlayerStopFilled} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {play, pause, stop} from "../../store/slice/playerSlice";

export const Player = () => {

    const isPlay = useSelector((state) => state.player.play)
    const isPause = useSelector((state) => state.player.pause)
    const isStop = useSelector((state) => state.player.stop)
    const dispatch = useDispatch()

    return (
        <Container borderWidth="1px" borderRadius="md" padding="5px" marginTop="5px" background={"white"}>
            <IconButton aria-label={"play"} margin={1} icon={<Icon as={TbPlayerPlayFilled}/>}
                        isDisabled={isPlay}
                        onClick={() => dispatch(play())}/>
            <IconButton aria-label={"pause"} margin={1} icon={<Icon as={TbPlayerPauseFilled}/>}
                        isDisabled={isPause}
                        onClick={() => dispatch(pause())}/>
            <IconButton aria-label={"stop"} margin={1} icon={<Icon as={TbPlayerStopFilled}/>}
                        isDisabled={isStop}
                        onClick={() => dispatch(stop())}/>
        </Container>
    )
}