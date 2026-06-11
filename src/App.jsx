import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ReviewBoard from './pages/ReviewBoard.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import StoreGuide from './pages/StoreGuide.jsx';

const pages = {
  home: Home,
  products: Products,
  detail: ProductDetail,
  reviews: ReviewBoard,
  cart: Cart,
  login: Login,
  store: StoreGuide,
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product, size, options = {}) => {
    const { silent = false } = options;
    if (!size) {
      alert('사이즈를 선택해주세요.');
      return;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size,
      );

      if (existingItemIndex > -1) {
        const nextItems = [...prevItems];
        nextItems[existingItemIndex] = {
          ...nextItems[existingItemIndex],
          quantity: nextItems[existingItemIndex].quantity + 1,
        };
        return nextItems;
      }

      return [
        ...prevItems,
        {
          ...product,
          size,
          quantity: 1,
          uniqueId: `${product.id}-${size}-${Date.now()}`, // unique key for list
        },
      ];
    });

    if (silent) return true;

    alert('상품이 장바구니에 담겼습니다.');
  };

  const handleRemoveFromCart = (uniqueId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const handleUpdateQuantity = (uniqueId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const CurrentPage = pages[currentPage];

  return (
    <div className="app">
      <Header
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          if (page !== 'products') setSearchQuery('');
        }}
        onSearch={handleSearch}
      />
      <main>
        <CurrentPage
          onNavigate={setCurrentPage}
          selectedProduct={selectedProduct}
          onProductDetail={handleProductDetail}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
