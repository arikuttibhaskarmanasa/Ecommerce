import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { ShippingAddress } from '../types';

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Redirect to cart if cart is empty
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  // Show success page if order is placed
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
            <ShieldCheck size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold mb-4">Thank you for your order!</h1>
          <p className="text-xl mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-600 mb-8">
            Order number: <span className="font-medium">{orderNumber}</span>
          </p>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation email with your order details.
            You can track your order in the "My Orders" section of your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="btn btn-outline"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="btn btn-primary"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle form submission
  const handleCheckoutSubmit = (address: ShippingAddress, paymentMethod: string) => {
    // In a real application, this would send the order to an API
    console.log('Order submitted:', { items, address, paymentMethod });
    
    // Generate random order number
    const randomOrderId = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setOrderNumber(randomOrderId);
    
    // Clear cart and show success page
    setTimeout(() => {
      clearCart();
      setOrderPlaced(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>
        
        {/* Order Summary */}
        <div>
          <CartSummary isCheckoutPage={true} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;