import { Menu } from '../models/Menu';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface MenuItemComponentProps {
    item: Menu
}

export default function MenuItemComponent({ item }: MenuItemComponentProps){
    return (
        <Card sx={{ display: 'flex', marginBottom: '1rem' }}>
            {item.img !== null ? (
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.img}
                    alt={item.name}
                />
            ) : ''}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}