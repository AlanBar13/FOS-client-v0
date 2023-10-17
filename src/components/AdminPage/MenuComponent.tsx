import { useState, useEffect } from 'react';
import { fetchMenuAll } from '../../services/menu.service';
import { Menu } from '../../models/Menu';
import MenuDataComponent from './Menu/MenuDataComponent';
import CircularProgress from '@mui/material/CircularProgress';
import AdminAppBarComponent from './Shared/AdminAppBarComponent';

export default function MenuComponent(){
    const [menu, setMenu] = useState<Menu[] | null>(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menu = await fetchMenuAll();
                setMenu(menu)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMenuData();
    }, []);

    return(
        <>
            <AdminAppBarComponent title='Administracion de Menu' />
            {menu !== null ? (<MenuDataComponent menu={menu} />) : <CircularProgress />}
        </>
    )
}