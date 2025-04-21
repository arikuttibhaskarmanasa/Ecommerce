import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartSummaryProps {
  isCheckoutPage?: boolean;
}

const CartSummary = ({ isCheckoutPage = false }: CartSummaryProps) => {
  const { items, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }

    navigate('/checkout');
  };

  const handlePlaceOrder = () => {
    if (!isCheckoutPage) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      navigate('/order-success');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm animate-fadeIn">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-base text-gray-900">
          <p>Subtotal ({items.length} items)</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        
        <div className="flex justify-between text-base text-gray-900">
          <p>Shipping</p>
          <p>{shipping === 0 ? 'Free' : formatPrice(shipping)}</p>
        </div>
        
        <div className="flex justify-between text-base text-gray-900">
          <p>Tax (7%)</p>
          <p>{formatPrice(tax)}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
          <p>Total</p>
          <p>{formatPrice(total)}</p>
        </div>
        
        {shipping === 0 && (
          <div className="bg-green-50 text-green-800 p-3 rounded text-sm">
            You've qualified for free shipping!
          </div>
        )}
        
        {!isCheckoutPage && (
          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full btn btn-primary py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        )}
        
        {isCheckoutPage && (
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full btn btn-primary py-3 mt-4 relative disabled:opacity-80"
          >
            {isProcessing ? (
              <>
                <span className="opacity-0">Place Order</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Place Order'
            )}
          </button>
        )}
      </div>
      
      {/* Payment method icons */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-2">We accept</p>
        <div className="flex space-x-2">
          <div className="h-6 w-10 bg-gray-300 rounded"></div>
          <div className="h-6 w-10 bg-gray-300 rounded"></div>
          <div className="h-6 w-10 bg-gray-300 rounded"></div>
          <div className="h-6 w-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;