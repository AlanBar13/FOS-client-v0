import {createBrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import Admin from './pages/Admin';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage
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