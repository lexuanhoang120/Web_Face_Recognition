import { useRoutes } from 'react-router-dom';

import routesBuilder from '@/routes';

const CRoutes = () => {
    const routes = useRoutes(routesBuilder);

    return routes;
};

export default CRoutes;
