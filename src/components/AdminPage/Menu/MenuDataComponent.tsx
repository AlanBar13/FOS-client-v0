import { useState, useMemo } from 'react';
import { Menu } from '../../../models/Menu';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';

import { formatPriceFixed } from '../../../utils/numbers';
import { formatDate } from '../../../utils/dates';

interface MenuDataComponentProps {
    menu: Menu[]
    onMenuChange: (newMenu: Menu[]) => void
}

type Order = 'asc' | 'desc';

function createCompareFn<T extends Object>(
    property: keyof T,
    sort_order: Order
  ) {
    const compareFn = (a: T, b: T) => {
      const val1 = a[property];
      const val2 = b[property];
      const order = sort_order !== "desc" ? 1 : -1;
      
      switch (typeof val1) {
        case "number": {
          const valb = val2 as number;
          const result = val1 - valb;
          return result * order;
        }
        case "string": {
          const valb = val2 as string;
          const result = val1.localeCompare(valb);
          return result * order;
        }
        case "boolean": {
            const valb = val2 as boolean;
            const vala = val1 as boolean;
            const result = Number(valb) - Number(vala);
            return result * order;
        }
        default:
          return 0;
      }
    };
    return compareFn;
}

const properties = [
    {
        name: 'id',
        displayName: 'id'
    },
    {
        name: 'name',
        displayName: 'nombre'
    },
    { 
        name: 'description',
        displayName: 'descripcion',
        noSort: true
    },
    { 
        name: 'available',
        displayName: 'disponible'
    },
    { 
        name: 'category',
        displayName: 'categoria'
    },
    { 
        name: 'price',
        displayName: 'precio'
    },
    { 
        name: 'tax',
        displayName: 'iva'
    },
    { 
        name: 'img',
        displayName: 'imagen',
        noSort: true
    },
    { 
        name: 'createdAt',
        displayName: 'creado'
    },
    { 
        name: 'updatedAt',
        displayName: 'actualizado'
    },
]

export default function MenuDataComponent({ menu, onMenuChange }: MenuDataComponentProps){
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Menu>('id');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const visibleRows = useMemo(() => {
        return menu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [menu, page, rowsPerPage])

    const handleSort = (property: keyof Menu) => {
        const isAsc = orderBy === property && order =='asc';
        setOrder(isAsc ? 'desc': 'asc');
        setOrderBy(property);
        const newRows = menu.slice().sort(createCompareFn(property, order));
        onMenuChange(newRows);
    }

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label='menu table'>
                    <TableHead>
                        <TableRow>
                            {properties.map(property => (
                                <TableCell key={property.name} sortDirection={orderBy === property.name as keyof Menu ? order : false}>
                                    {property.noSort ? property.displayName.toLocaleUpperCase() : (
                                        <TableSortLabel 
                                            active={orderBy === property.name as keyof Menu}
                                            direction={orderBy === property.name as keyof Menu ? order : 'asc'}
                                            onClick={() => handleSort(property.name as keyof Menu)}>
                                            {property.displayName.toLocaleUpperCase()}
                                        </TableSortLabel>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell component="th" scope='row'>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.available ? <Chip color='success' label="Disponible" /> : <Chip color='error' label="No Disponible" />}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{formatPriceFixed(item.price)}</TableCell>
                                <TableCell>{formatPriceFixed(item.tax ? item.tax : 0)}</TableCell>
                                <TableCell>{item.img !== null ? <Chip color='primary' label="Agregada" /> : <Chip label="No Agregada" />}</TableCell>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                <TableCell>{formatDate(item.updatedAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={menu.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}