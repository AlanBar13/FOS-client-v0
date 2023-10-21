import {useState, useEffect, SyntheticEvent} from 'react';
import { Menu } from '../models/Menu';
import { Cart } from '../models/Cart';
import { OrderItem } from '../models/OrderItem';
import { fetchMenu } from '../services/menu.service';
import { createOrder, getActiveOrder, addOrderItem } from '../services/table.service';
import { useQuery } from '../hooks/useQuery';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';

import AlertComponent from '../components/Shared/AlertComponent';
import MenuItemComponent from '../components/MenuPage/MenuItemComponent';
import AppLayout from '../components/Shared/AppLayout';
import CartComponent from '../components/MenuPage/CartComponent';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'grey',
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? 'grey' : 'white',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export default function MenuPage(){
    const query = useQuery();
    const [companyName, _] = useState<string>(import.meta.env.VITE_COMPANY_NAME);
    const [menu, setMenu] = useState<Menu[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tableId] = useState<string | null>(query.get("mesa"));
    const [orderId, setOrderId] = useState<number | null>(null);
    const [cart, setCart] = useState<Cart[]>([]);
    const [itemsOrdered, setItemsOrdered] = useState<OrderItem[]>([]);
    const [cartIsLoading, setCartIsLoading] = useState<boolean>(false);

    const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
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
                if (tableId){
                    const getOrder = await getActiveOrder(tableId);
                    const order = getOrder.data.orderId as number;
                    setOrderId(order);
                }
            } catch (error: any) {
                setError((error as Error).message);
                setOpen(true);
            }
            setIsLoading(false);
        }

        fetchData();
    }, []);

    const addToCart = (item: Menu, qty: number) => {
        setCart([...cart, { qty, item, total: qty * item.price }]);
        setOpenCart(true);
    }

    const deleteFromCart = (itemIndex: number) => {
        const newCart = cart.filter((_, index) => index !== itemIndex);
        setCart(newCart);
    }

    const order = async () => {
        if (tableId === null) {
            console.log('no table id')
            return;
        }
        setCartIsLoading(true);
        //If there is no order create an order
        if (orderId == null){
            console.log('no active order')
            try {
                const orderCreated = await createOrder(tableId);
                setOrderId(orderCreated.id);
            } catch (error) {
                console.log(error)
            }
        }

        await Promise.all(
            cart.map(async (crt) => {
                try {
                    const newOrderItem = await addOrderItem(tableId, orderId!, {
                        menuId: crt.item.id!,
                        qty: crt.qty,
                        //TODO: add comments
                    });
                    setItemsOrdered([...itemsOrdered, newOrderItem]);
                    //emit socket
                    setCart([]);
                } catch (error) {
                    console.log(error)
                }
            })
        );
        setCartIsLoading(false);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenCart(newOpen);
    };

    return (
        <AppLayout companyName={`${companyName} | Menu`}>
            <Global
                styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                    height: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                },
                }}
            />
            {isLoading && <LinearProgress />}
            <Box sx={{marginTop: '0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem', marginBottom: '4rem' }}>
                {menu.map((item) => <MenuItemComponent key={item.id} item={item} onAddClicked={addToCart} />)}
            </Box>
            <SwipeableDrawer 
                anchor='bottom' 
                open={openCart} 
                onClose={toggleDrawer(false)} 
                onOpen={toggleDrawer(true)} 
                swipeAreaWidth={drawerBleeding} 
                disableSwipeToOpen={false} 
                ModalProps={{keepMounted: true}}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        background: '#FFC107'
                    }}
                >
                    <Puller />
                    <Typography component="div" sx={{ p: 2, color: 'text.secondary.contrastText' }}>
                        <strong>
                            {orderId != null && `Orden #${orderId} |`} {tableId !== null ? `Mesa ${tableId}` : `No hay mesa seleccionada`} | Carrito ({cart.length})
                        </strong>
                    </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 1,
                        height: '100%',
                        overflow: 'auto',
                    }}
                    >
                    <CartComponent cart={cart} isLoading={cartIsLoading} deleteFromCart={deleteFromCart} onOrder={order} orderedItems={itemsOrdered} />
                </StyledBox>
            </SwipeableDrawer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <AlertComponent severity='error'>Error: {error}</AlertComponent>
            </Snackbar>
        </AppLayout>
    )
}