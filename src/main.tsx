import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from '@/store/store.ts';
import App from './App.tsx';
import './index.css';

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    white: {
      900: '#fdfffc',
    },
    dark: '#201e1f',
    grey: '#ebeaeb',
    blue: '#3fa7d6',
    red: '#f24236',
    yellow: {
      400: '#ffd60a',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
