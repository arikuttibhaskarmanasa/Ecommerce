import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shield, Truck, Award } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Hero background" 
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-200">
              Shop the latest trends with our curated collection of premium products. 
              Find everything you need with fast shipping and excellent customer service.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="btn btn-primary py-3 px-6 text-base">
                Shop Now
              </Link>
              <Link to="/products?category=Electronics" className="btn btn-outline bg-transparent border-white text-white hover:bg-white hover:text-gray-900 py-3 px-6 text-base">
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $100</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30 day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated quality items</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 flex items-center font-medium"
            >
              View All 
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Banner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/products?category=Electronics" 
              className="relative rounded-lg overflow-hidden group h-64 flex items-center justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Electronics" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <h3 className="relative text-white text-2xl font-bold z-10">Electronics</h3>
            </Link>
            
            <Link 
              to="/products?category=Home" 
              className="relative rounded-lg overflow-hidden group h-64 flex items-center justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Home & Kitchen" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <h3 className="relative text-white text-2xl font-bold z-10">Home & Kitchen</h3>
            </Link>
            
            <Link 
              to="/products?category=Accessories" 
              className="relative rounded-lg overflow-hidden group h-64 flex items-center justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/946187/pexels-photo-946187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Accessories" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <h3 className="relative text-white text-2xl font-bold z-10">Accessories</h3>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8 text-primary-100">
              Get the latest updates on new products and upcoming sales.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;