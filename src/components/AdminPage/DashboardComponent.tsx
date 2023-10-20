import { useSocketEvents, SocketEvent } from '../../hooks/useSocketEvents';

export default function DashboardComponent(){
    const events: SocketEvent[] = [
        {
            name: 'connect',
            handler(){
                console.log('socket connected')
            }
        }
    ];

    useSocketEvents(events);
    
    return (
        <div>DashboardComponent</div>
    )
}