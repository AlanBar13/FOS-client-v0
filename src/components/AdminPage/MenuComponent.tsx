import { useState, useEffect } from 'react';
import { fetchMenuAll } from '../../services/menu.service';
import { Menu } from '../../models/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuDataComponent from './Menu/MenuDataComponent';
import AdminAppBarComponent from './Shared/AdminAppBarComponent';
import AddItemComponent from './Menu/AddItemComponent';

export default function MenuComponent(){
    const [menu, setMenu] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMenuData = async () => {
            setIsLoading(true);
            try {
                const menu = await fetchMenuAll();
                setMenu(menu);
            } catch (error) {
                console.log(error)
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
                    <AddItemComponent onAddItem={addMenuItem}/>
                </AccordionDetails>
            </Accordion>
            {isLoading ? <CircularProgress /> : <MenuDataComponent menu={menu} onMenuChange={replaceList} />}
        </>
    )
}