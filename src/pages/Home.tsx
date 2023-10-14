import { useEffect, useState, useCallback } from 'react'
import api from '../utils/api';
import Container from '@mui/material/Container'

export default function Home(){
    const [companyName, _] = useState<string>(import.meta.env.VITE_COMPANY_NAME)
    const [tables, setTables] = useState([]);

    const getTables = useCallback(async () => {
        const response = await api.get('/table');
        if (response.status === 200){
            setTables(response.data)
        }
    }, [])

    useEffect(() => {
        document.title = `${companyName} | FOS`
        getTables()
    }, [])
    
    return (
        <Container>
            <p>{tables.length}</p>
        </Container>
    )
}