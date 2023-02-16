import React, { useState, useLayoutEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

const CustomRouter = ({ history, layout, children, ...props }) => {
    const _layout = (children) => {
        return layout ? (
            <layout.type {...layout.props}>{children}</layout.type>
        ) : (
            children
        );
    };

    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            {...props}
            children={_layout(children)}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default CustomRouter;
