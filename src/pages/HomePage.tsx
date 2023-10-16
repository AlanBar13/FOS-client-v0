import { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../models/Table';
import { fetchTables } from '../services/table.service';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import AlertComponent from '../components/AlertComponent';

export default function HomePage(){
    const navigate = useNavigate();
    const [companyName, _] = useState<string>(import.meta.env.VITE_COMPANY_NAME);
    const [selection, setSelection] = useState<string>("");
    const [tables, setTables] = useState<Table[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const selectTable = (event: SelectChangeEvent) => {
        const tableId = event.target.value;
        setSelection(tableId);
        return navigate(`/menu?mesa=${tableId}`, { replace: true })
    }

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    useEffect(() => {
        document.title = `${companyName} | FOS`;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const tables = await fetchTables();
                setTables(tables);
            } catch (error) {
                setError((error as Error).message);
                setOpen(true);
            }
            setIsLoading(false);
        }

        fetchData()
    }, [])

    return (
        <Container>
            <Box justifyContent="center" alignContent="center">
                <Typography variant="h2" gutterBottom>
                    Bienvenido a {companyName}
                </Typography>
                {isLoading ? (<CircularProgress color='inherit' />) : (
                    <FormControl fullWidth>
                        <InputLabel id="table-select">Elige la mesa</InputLabel>
                        <Select 
                            labelId="table-select"
                            value={selection}
                            label="Elige la Mesa"
                            disabled={error !== null}
                            onChange={selectTable}>
                                {tables.map((table) => <MenuItem key={table.id} value={table.id}>{table.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                )}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                    <AlertComponent severity='error'>Error: {error}</AlertComponent>
                </Snackbar>
            </Box>
        </Container>
    )
}