import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmounts:0
}

const cartReducer = (state,actions) => {
    if(actions.type === "ADD"){
        const updatedTotal = state.totalAmounts + (actions.items.amount *  actions.items.price);

        const existingItemIndex = state.items.findIndex(item => {
            return item.id === actions.items.id;
        })

        const existingItem = state.items[existingItemIndex];
        let updatedItems,updatedItem;

        if(existingItem){
            updatedItem = {
                ...existingItem,
                amount: existingItem.amount + actions.items.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(actions.items);
        }

        console.log(updatedItems)

        return {
            items:updatedItems,
            totalAmounts:updatedTotal
        }
    }

    if(actions.type === "REMOVE"){
        const cartItemIndexToBeRemoved = state.items.findIndex(item => {
            return item.id === actions.id
        })

        let updatedItems,updatedItem,updatedTotal;
        let existingItem = state.items[cartItemIndexToBeRemoved];
        updatedTotal = state.totalAmounts - existingItem.price;

        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => {
                return item.id != actions.id
            })
        }else{
            updatedItem = {
                ...existingItem,
                amount:existingItem.amount - 1 
            };

            updatedItems = [...state.items];
            updatedItems[cartItemIndexToBeRemoved] = updatedItem;
        }

        return {
            items:updatedItems,
            totalAmounts:updatedTotal
        }
    }

    return defaultCartState
}

const CartContextProvider = props => {
    const [cartState, dispatchCartState] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (items) => {
        
        dispatchCartState({
            type:"ADD",
            items:items
        })
        // console.log(cartState)
    };

    const removeItemFromCart =(id) => {
        dispatchCartState({
            type:"REMOVE",
            id:id
        })
    };

    const cartContxtValue = {
        items:cartState.items,
        totalAmounts: cartState.totalAmounts,
        addItem :addItemToCartHandler,
        removeItem:removeItemFromCart,
    }

    return <CartContext.Provider value={cartContxtValue}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider;