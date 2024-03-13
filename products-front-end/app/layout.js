'use client';
import { Inter } from 'next/font/google';
import { Provider} from 'react-redux';
import store from './store/configureStore';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/styles.css'


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
			<Provider store={store}>
        <body className={inter.className}>
        {children}
        </body>
			</Provider>
    </html>
  )
}







































