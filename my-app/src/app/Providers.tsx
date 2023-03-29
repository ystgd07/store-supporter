'use client';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/configureStore';
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <Provider store={store}>
                <div className="min-h-screen text-gray-700 transition-colors duration-300 select-none dark:bg-gray-700 dark:text-gray-200">
                    {children}
                </div>
            </Provider>
        </ThemeProvider>
    );
}
