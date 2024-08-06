import { useMachine } from '@xstate/react';
import { bookingMachine } from "../Machines/bookingMachine";


const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine)

    console.log('nuestra máquina', state)

    return (
        <div>Hola</div>
    )
}

export { BaseLayout }