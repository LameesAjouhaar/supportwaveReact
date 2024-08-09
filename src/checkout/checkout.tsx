import React from 'react';
import style from './Checkout.module.scss';


export const Checkout = ({ cartItems, onClose }: { cartItems: any[], onClose: () => void }) => {

    /**calculates the total price amount, of items within cart */
    const totalPrice = cartItems.reduce((total, item) => total + item.Price, 0);

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <span className={style.closeButton} onClick={onClose}>&times;</span>
                <h2 className={style.h2Heading}>Checkout</h2>
                <div className={style.cartItems}>
                    {cartItems.map((item, index) => (
                        <div key={index} className={style.cartItem}>
                            <p><strong>{item.Make} {item.Model}</strong></p>
                            <p>Price: ${item.Price}</p>
                        </div>
                    ))}
                </div>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
};


