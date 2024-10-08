// Summary.js
import React, { useEffect, useState ,useRef} from "react";
import './Summary.css';
import { Link } from "react-router-dom";


function Summary({removeAllFromCart, cart}) {
  const [orderedItems, setOrderedItems] = useState([]);
  const hasRunEffect = useRef(false); // Add this line


    //removing all cart items
    let checkoutDetails = JSON.parse(localStorage.getItem('checkoutDetails'));
    // Assuming `card` is defined somewhere with its value
    const card = ""; // Define `card` here with its actual value
    // Update checkoutDetails with card information
    checkoutDetails = { ...checkoutDetails, card: card };
    // Update the checkoutDetails in local storage
    localStorage.setItem("checkoutDetails", JSON.stringify(checkoutDetails));

    useEffect(() => {
      if (hasRunEffect.current) return; // If effect has run, return early
      hasRunEffect.current = true; // Mark effect as having run
  
      const storedItems = cart;
      if (storedItems !== null && storedItems.length > 0) {
        setOrderedItems(storedItems);
      }
  
      console.log("Effect to remove all from cart", cart);
      removeAllFromCart(); // Remove all items from cart
      // eslint-disable-next-line
    }, []); 

  return (
    <div className="summary-container">
      <h2 className="summary-header">Order Confirmation</h2>
      <div className="summary-ordered-items">
        {orderedItems.map(item => (
          <div key={item.cartItemID} className="summary-item">
            <div className="summary-name">{item.name}   x{item.quantity}</div>
            <div className="summary-price">${item.price * item.quantity}</div>
          </div>
        ))}
      </div>
      <div className="summary-confirmation-message">
      {/*<a href="https://www.flaticon.com/free-icons/yes" title="yes icons">Yes icons created by hqrloveq - Flaticon</a> */}
        <img src="check.png" alt="order-complete" style={{height: '200px', width:'200px', margin: '20px auto'}}></img>
        <p style={{fontSize: '20px', color: '#495057', fontFamily: '"Open Sans", sans-serif', marginTop: '20px'}}>Your order is complete. Thank you for shopping with us!</p>
      </div>
      <Link style={{textDecoration: 'none'}} to="/" ><button className="summary-back-btn" >Back To Home</button></Link>
    </div>
  );
}

export default Summary;