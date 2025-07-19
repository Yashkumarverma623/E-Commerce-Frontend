import { useState, useEffect } from 'react';
import HeaderComponent from './HeaderComponent';
import AuthComponent from './AuthComponent';
import ProductList from './ProductComponent';
import CartComponent from './CartComponent';
import WishlistComponent from './WishlistComponent';
import AddProduct from "./AddProduct.jsx";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentView, setCurrentView] = useState('products');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setCurrentView('products');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCartCount(0);
    setCurrentView('products');
  };

  const handleCartUpdate = (count) => {
    setCartCount(count);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthComponent onAuthSuccess={handleAuthSuccess} />;
      case 'cart':
        return <CartComponent user={user} token={token} onCartUpdate={handleCartUpdate} />;
      case 'wishlist':
        return <WishlistComponent user={user} token={token} />;
      case 'addProduct':
        return <AddProduct user={user} token={token} />;
      case 'products':
      default:
        return <ProductList user={user} token={token} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderComponent
        user={user}
        token={token}
        onLogout={handleLogout}
        cartCount={cartCount}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main>
        {renderCurrentView()}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">ShopHub</h3>
              <p className="text-gray-600 mb-4">
                Your one-stop destination for amazing products. We offer quality items at competitive prices with excellent customer service.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button 
                    onClick={() => setCurrentView('products')}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('cart')}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Shopping Cart
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentView('wishlist')}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Wishlist
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">About Us</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">Shipping Info</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">Returns</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 text-sm">
                © 2024 ShopHub. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;