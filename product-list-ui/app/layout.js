'use client';
import "./globals.css";
import {Provider} from 'react-redux';
import store from '../app/store/configureStore';


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body>{children}</body>
    </html>
    </Provider>
  );
}
