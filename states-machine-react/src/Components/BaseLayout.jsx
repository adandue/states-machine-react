import { useMachine } from '@xstate/react';
import { bookingMachine } from "../Machines/bookingMachine";


const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine)

    console.log('nuestra maquina', state)
    console.log('Matches true', state.matches('initial'))
    console.log('Matches false', state.matches('tickets'))
    console.log('can', state.can('FINISH'))

    return (
        <div>Hola</div>
    )
}

export { BaseLayout }