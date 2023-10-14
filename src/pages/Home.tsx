import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../utils/api';
import { Table } from '../models/Table';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Home(){
    const navigate = useNavigate();
    const [companyName, _] = useState<string>(import.meta.env.VITE_COMPANY_NAME);
    const [selection, setSelection] = useState<string>("");
    const [tables, setTables] = useState<Table[]>([]);

    const getTables = useCallback(async () => {
        const response = await api.get('/table');
        if (response.status === 200){
            setTables(response.data);
        }
    }, [])

    const selectTable = (event: SelectChangeEvent) => {
        const tableId = event.target.value;
        setSelection(tableId);
        return navigate(`/menu?mesa=${tableId}`, { replace: true })
    }

    useEffect(() => {
        document.title = `${companyName} | FOS`;
        getTables();
    }, [])

    return (
        <Container>
            <Box justifyContent="center" alignContent="center">
            <Typography variant="h1" gutterBottom>
                Bienvenido a {companyName}
            </Typography>
                <FormControl fullWidth>
                    <InputLabel id="table-select">Elige la mesa</InputLabel>
                    <Select 
                        labelId="table-select"
                        value={selection}
                        label="Elige la Mesa"
                        onChange={selectTable}>
                            {tables.map((table) => <MenuItem key={table.id} value={table.id}>{table.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </Container>
    )
}