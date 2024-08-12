import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'getCountries',
                src: fromPromise(() => fetchCountries()),
                onDone: {
                    target: 'success',
                    actions: assign({
                    countries: ({ event }) => event.output,
                    })
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                    error: 'Falló el request'
                    })
                }
            }
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
        countries: [],
        error: '',
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
            after: {
                5000: {
                    target: 'initial'
                }
            },
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