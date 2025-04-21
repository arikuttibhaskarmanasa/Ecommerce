import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  const { items } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-6">
            <ShoppingCart size={32} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.product.id}>
                      <CartItem item={item} />
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;