import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import { store } from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ChakraProvider>
    </StrictMode>
);
