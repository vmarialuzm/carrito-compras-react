import { useReducer } from 'react'
import { CarritoContext } from './CarritoContext'

const initialState = []

export const CarritoProvider = ({ children }) => {

    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CARRITO] Agregar compra':
                return [...state, action.payload]
            case '[CARRITO] Aumentar Cantidad Compra':                   
                return state.map(s => {
                    const cant = s.cantidad + 1
                    if(s.id == action.payload) return {...s, cantidad: cant}
                    return s
                })
            case '[CARRITO] Disminuir Cantidad Compra':                        
                return state.map(s => {
                    const cant = s.cantidad - 1
                    if(s.id == action.payload && s.cantidad > 1) return {...s, cantidad: cant}
                    return s
                })
                return state
            case '[CARRITO] Eliminar Compra':
                return state.filter(compra => compra.id !== action.payload)                              
            default:
                return state                     
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)
    
    const agregarCompra = (compra) => {
        compra.cantidad = 1
        const action = {
            type: '[CARRITO] Agregar compra',
            payload: compra
        }
        dispatch(action)
    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const elimimarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id
        }
        dispatch(action)
    }

    return (
        <CarritoContext.Provider value={{listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, elimimarCompra}}>
            {children}
        </CarritoContext.Provider>
    )
}
