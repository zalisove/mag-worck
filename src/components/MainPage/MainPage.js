import './MainPage.css';
import EngineSection from "../EngineSection/EngineSection";
import UserInputSection from "../UserInputSection/UserInputSection";
import {GraphsSection} from "../GraphsSection/GraphsSection";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {DragHandleIcon} from '@chakra-ui/icons'
import {Center, Container} from "@chakra-ui/react";
import {Player} from "../Player/Player";
import Draggable from "react-draggable";

function MainPage() {

    return (
        <>
            <Draggable cancel="strong" bounds="parent">
                <div style={{position: 'absolute', zIndex: 100}}>
                    <Player/>
                </div>
            </Draggable>
            <PanelGroup id="mainPage" autoSaveId="example_test" direction="vertical">
                <Panel>
                    <PanelGroup autoSaveId="example" direction="horizontal">
                        <Panel>
                            <EngineSection/>
                        </Panel>
                        <PanelResizeHandle>
                            <Container padding="5px" width={6} height={"full"} minHeight={"full"} borderWidth="1px"
                                       background={"rgba(180, 180, 180, 0.5)"}>
                                <Center height={"full"}>
                                    <DragHandleIcon/>
                                </Center>
                            </Container>
                        </PanelResizeHandle>
                        <Panel>
                            <UserInputSection/>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle>
                    <Container padding="5px" height={6} minWidth={"full"} borderWidth="1px"
                               background={"rgba(180, 180, 180, 0.5)"}>
                        <Center width={"full"}>
                            <DragHandleIcon style={{rotate: "90deg"}}/>
                        </Center>
                    </Container>
                </PanelResizeHandle>
                <Panel>
                    <GraphsSection/>
                </Panel>
            </PanelGroup>
        </>
    );
}

export default MainPage;