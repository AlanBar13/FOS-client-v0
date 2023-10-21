import { useMemo } from 'react';
import _ from 'lodash';
import { Cart } from "../../models/Cart";
import { formatPriceFixed } from "../../utils/numbers";
import { OrderItem } from '../../models/OrderItem';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

interface CartComponentProps {
    cart: Cart[]
    isLoading: boolean
    orderedItems?: OrderItem[]
    deleteFromCart: (index: number) => void
    onOrder: () => void
}

export default function CartComponent({ cart, isLoading = false, orderedItems = [], deleteFromCart, onOrder }: CartComponentProps) {
    const orderTotal = useMemo(() => _.sumBy(cart, 'total'), [cart]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
            <Box>
                <Box sx={{overflow: 'auto'}}>
                    {cart.map((crt, index) => (
                        <Box key={index} sx={{display: 'flex', flexDirection: 'row'}}>
                            <IconButton onClick={() => deleteFromCart(index)}>X</IconButton>
                            <Typography sx={{paddingTop: '0.55rem'}}>
                                {crt.qty}x - {crt.item.name} - {formatPriceFixed(crt.total)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                {orderedItems.length > 0 && (
                    <Box sx={{overflow: 'auto'}}>
                        <Divider />
                        {orderedItems.map((item, index) => (
                            <Box key={index} sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography sx={{paddingTop: '0.55rem'}}>
                                    {item.menuId}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <Box>
                <Divider />
                {isLoading && <LinearProgress />}
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography sx={{paddingTop: '0.5rem'}} component="div">
                        <strong>Total: {formatPriceFixed(orderTotal)}</strong>
                    </Typography>
                    <Button disabled={cart.length === 0} onClick={onOrder}>Ordenar</Button>
                </Box>
            </Box>
        </Box>
    )
}