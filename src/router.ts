import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Admin from './pages/Admin';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/menu",
        Component: Menu
    },
    {
        path: "/admin",
        Component: Admin
    },
]);

export default router;