import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Admin from './pages/Admin';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/menu",
        Component: MenuPage
    },
    {
        path: "/admin",
        Component: Admin
    },
]);

export default router;