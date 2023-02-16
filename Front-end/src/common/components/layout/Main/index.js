import React from 'react';

import CLoadingLayout from '../CLoadingLayout';

const MainLayout = ({ isLoading, children }) => {
    if (isLoading !== false) return <CLoadingLayout />;

    //#region Render
    return (
        <>
            <React.Suspense>{children}</React.Suspense>
        </>
    );
    //#endregion
};

export default MainLayout;
