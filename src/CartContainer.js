import React from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'
import { loadStripe } from "@stripe/stripe-js";
const CartContainer = () => {
  const { cart,total,clearCart } = useGlobalContext()
  

  if (cart.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }


  const handlePayment = async () => {
    const stripePromise = await loadStripe('pk_test_51P2rUaSCdJvIMrFepePoKC6vpZkEWWDq41ssUObqxDvNo55LQyDqvSJ2juP3MIqSaJpDTVlp9E4QUAASmOFlxA6200VqUhAg9Q');
    const stripe = stripePromise;
    try {
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          CartItem: cart,
          totalAmount: total,
        }),
      });
      const data = await response.json();
      const sessionId = data.sessionId;
      const result = await stripe.redirectToCheckout({
        sessionId:sessionId,
        
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error handling payment', error);
    }
  };
  
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={clearCart}
        >
          clear cart
        </button>
        <button className='btn payment-btn' onClick={handlePayment}>
          proceed to payment
        </button>
        <a href="https://buy.stripe.com/test_9AQ4jlfQC2CNcZWfYY" target="_blank" rel="noopener noreferrer">
      Checkout
    </a>



      </footer>
    </section>
  )
}

export default CartContainer
