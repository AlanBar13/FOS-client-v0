import {useState, useEffect, SyntheticEvent} from 'react';
import { Menu } from '../models/Menu';
import { fetchMenu } from '../services/menu.service';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import AlertComponent from '../components/Shared/AlertComponent';
import MenuItemComponent from '../components/MenuPage/MenuItemComponent';
import AppLayout from '../components/Shared/AppLayout';

export default function MenuPage(){
    const [companyName, _] = useState<string>(import.meta.env.VITE_COMPANY_NAME);
    const [menu, setMenu] = useState<Menu[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    useEffect(() => {
        document.title = `${companyName} | Menu`;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const menu = await fetchMenu();
                setMenu(menu);
            } catch (error: any) {
                setError((error as Error).message);
                setOpen(true);
            }
            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <AppLayout companyName={companyName}>
            <Box>
                <Typography>
                    Menu {companyName}
                </Typography>
            </Box>
            {isLoading ? (<CircularProgress color='inherit' />) : (
                menu.map((item) => <MenuItemComponent key={item.id} item={item} />)
            )}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <AlertComponent severity='error'>Error: {error}</AlertComponent>
            </Snackbar>
        </AppLayout>
    )
}