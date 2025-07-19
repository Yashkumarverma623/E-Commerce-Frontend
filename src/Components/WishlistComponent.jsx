import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WishlistComponent = ({ user, token }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setWishlistItems(data.items || []);
      } else {
        setError('Failed to fetch wishlist');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchWishlist();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to remove from wishlist');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      if (response.ok) {
        alert('Item added to cart successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add item to cart');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
        <p className="text-gray-600">You need to be logged in to view your wishlist.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchWishlist}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Save your favorite items to your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600 mt-2">{wishlistItems.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 h-48">
                <img
                  src={item.product?.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={item.product?.name || 'Product'}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeFromWishlist(item.product?._id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.product?.name || 'Unknown Product'}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.product?.description || 'No description available'}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  ${item.product?.price?.toFixed(2) || '0.00'}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.product?.category || 'Uncategorized'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item.product?._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.product?._id)}
                  className="p-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistComponent;