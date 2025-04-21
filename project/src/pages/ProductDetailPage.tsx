import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Share, ShoppingCart, Star, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../data/products';
import { formatPrice, formatDate } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/products/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  // Find product by id
  const product = products.find(p => p.id === id);
  
  // Similar products (same category, different id)
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  // Redirect to 404 if product not found
  useEffect(() => {
    if (!product) {
      navigate('/not-found', { replace: true });
    }
  }, [product, navigate]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate network delay
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
    }, 600);
  };
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (!product) {
    return null; // Will redirect to 404 via the useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link
                to={`/products?category=${product.category}`}
                className="text-gray-500 hover:text-primary-600"
              >
                {product.category}
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-700 font-medium">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="animate-fadeIn">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="animate-fadeIn">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{product.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {formatPrice(product.price)}
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Product meta */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              {product.subcategory && (
                <div>
                  <p className="text-sm text-gray-500">Subcategory</p>
                  <p className="font-medium">{product.subcategory}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Added on</p>
                <p className="font-medium">{formatDate(product.createdAt)}</p>
              </div>
            </div>
            
            {/* Quantity and Add to cart */}
            {product.inStock && (
              <div>
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center border-transparent focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="btn btn-primary py-3 px-8 flex-grow relative disabled:opacity-80"
                  >
                    {isAddingToCart ? (
                      <>
                        <span className="opacity-0">Add to Cart</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={toggleFavorite}
                    className={`p-3 border rounded-md flex items-center justify-center ${
                      isFavorite 
                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={isFavorite ? 'fill-current' : ''} />
                  </button>
                  
                  <button
                    type="button"
                    className="p-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <Share />
                  </button>
                </div>
              </div>
            )}
            
            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <Truck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free shipping on orders over $100</span>
                </li>
                <li className="flex items-start">
                  <RotateCcw className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">30-day money-back guarantee</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure checkout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 ${
                activeTab === 'description'
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-4 px-1 ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`pb-4 px-1 ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.numReviews})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="mb-4">
                {product.description}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, 
                id dignissim quam. Praesent placerat risus quis eros varius, a cursus nisi blandit.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="px-4 py-5 sm:p-6">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                      <dd className="mt-1 text-sm text-gray-900">10 × 5 × 2 inches</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Weight</dt>
                      <dd className="mt-1 text-sm text-gray-900">1.5 pounds</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Material</dt>
                      <dd className="mt-1 text-sm text-gray-900">Premium quality</dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                      <dd className="mt-1 text-sm text-gray-900">1 year limited</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Country of Origin</dt>
                      <dd className="mt-1 text-sm text-gray-900">United States</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">SKU</dt>
                      <dd className="mt-1 text-sm text-gray-900">SKU-{product.id}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-8 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={24}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-lg font-medium">{product.rating.toFixed(1)} out of 5</span>
              </div>
              
              <div className="space-y-6">
                {/* Sample reviews - in a real app, these would be fetched from an API */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          className={`${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">John D.</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">3 months ago</span>
                  </div>
                  <p className="text-gray-700">
                    Great product! Exactly as described and arrived quickly.
                    The quality is excellent, and I would definitely buy again.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          className={`${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">Sarah T.</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">1 month ago</span>
                  </div>
                  <p className="text-gray-700">
                    Really happy with my purchase. The item is well-made and looks exactly like the pictures.
                    Shipping was fast and the packaging was secure.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          className={`${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">Michael R.</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-gray-700">
                    Absolutely love this! The quality is top-notch and it's even better than I expected.
                    Customer service was also excellent when I had a question.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="btn btn-outline">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <ProductGrid products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;