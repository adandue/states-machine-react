import { assign, createMachine } from "xstate";

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            on: {
                DONE: 'success',
                ERROR: 'failure'
            },
        },
        success: {},
        failure: {
            on: {
                RETRY: {target: 'loading'}
            },
        },
    },
}

const bookingMachine = createMachine({
    id: "buy plane tickets",
    initial: "initial",
    context: {
        passengers: [],
        selectedCountry: '',
    },
    states: {
        initial: {
            entry: assign(
                ({context}) => {
                    context.passengers = [],
                    context.selectedCountry = ''
                }
            ),
            on: {
            START: {
                target:'search',
            },
            },
        },
        search: {
            on: {
            CONTINUE: {
                target: 'passengers',
                actions: assign({
                    selectedCountry: ({ event }) => event.selectedCountry,
                })
            },
            CANCEL: "initial",
            },
            ...fillCountries,
        },
        tickets: {
            on: {
            FINISH: "initial",
            },
        },
        passengers: {
            on: {
            DONE: "tickets",
            CANCEL: "initial",
            ADD: {
                target: 'passengers',
                actions: assign(
                    ({context, event}) => context.passengers.push(event.newPassenger)
                )
            },
            },
        },
    },
    
    },
    {
        actions: {
            imprimirInicio: () => console.log('Imprimir Inicio'),
            imprimirEntrada: () => console.log('Imprimir Entrada a search'),
            imprimirSalida: () => console.log('Imprimir Salida del search')
        },
    }
);



export { bookingMachine }