import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyle';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import CartProvider from './context/Cart';
import { PersistGate } from 'redux-persist/integration/react';
import { LoaderProvider } from './context/Loader/LoaderContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* `loading` là những gì được render trong khi đang chờ dữ liệu được lấy từ storage */}
            {/* nếu ko có gì được render là null */}
            {/* `persistor={persistor}` là đối tượng được tạo từ redux persist */}
            {/* chứa các phương thức để tạm dừng, tiếp tục, hoặc xóa các lần lưu trữ. */}
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyles>
                    <CartProvider>
                        <LoaderProvider>
                            {/* Sử dụng LoaderProvider ở đây */}
                            <App />
                        </LoaderProvider>
                    </CartProvider>
                </GlobalStyles>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
