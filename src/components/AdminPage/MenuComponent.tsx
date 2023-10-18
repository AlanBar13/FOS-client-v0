import { useState, useEffect, SyntheticEvent } from 'react';
import { fetchMenuAll } from '../../services/menu.service';
import { Menu } from '../../models/Menu';

import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert';

import MenuDataComponent from './Menu/MenuDataComponent';
import AdminAppBarComponent from './Shared/AdminAppBarComponent';
import AddItemComponent from './Menu/AddItemComponent';
import AlertComponent from '../Shared/AlertComponent';

export default function MenuComponent(){
    const [menu, setMenu] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>("error");

    useEffect(() => {
        const fetchMenuData = async () => {
            setIsLoading(true);
            try {
                const menu = await fetchMenuAll();
                setMenu(menu);
            } catch (error) {
                openFeedback('Error de red');
            }
            setIsLoading(false);
        }

        fetchMenuData();
    }, []);

    const addMenuItem = (newItem: Menu) => {
        setMenu([...menu, newItem])
    }

    const replaceList = (newList: Menu[]) => {
        setMenu(newList);
    }

    const openFeedback = (message: string, severity?: AlertColor) => {
        if (severity) {
            setAlertSeverity(severity);
        }
        setError(message);
        setOpen(true);
    }

    const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setError("");
        setAlertSeverity("error");
    };

    return(
        <>
            <AdminAppBarComponent title='Administracion de Menu' />
            <Accordion sx={{ marginBottom: '1rem'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Añadir nuevo producto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddItemComponent onAddItem={addMenuItem} onFeedback={openFeedback}/>
                </AccordionDetails>
            </Accordion>
            {isLoading ? <CircularProgress /> : <MenuDataComponent menu={menu} onMenuChange={replaceList} />}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <AlertComponent severity={alertSeverity}>{error}</AlertComponent>
            </Snackbar>
        </>
    )
}