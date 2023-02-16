import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const MyQueryClientProvider = ({ client, children }) => (
    <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={global.isDev} position="bottom-right" />
    </QueryClientProvider>
);

export default MyQueryClientProvider;
