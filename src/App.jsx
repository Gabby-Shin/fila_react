import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ReviewBoard from './pages/ReviewBoard.jsx';
import Cart from './pages/Cart.jsx';

const pages = {
  home: Home,
  products: Products,
  detail: ProductDetail,
  reviews: ReviewBoard,
  cart: Cart,
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const CurrentPage = pages[currentPage];

  const handleProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        <CurrentPage
          onNavigate={setCurrentPage}
          selectedProduct={selectedProduct}
          onProductDetail={handleProductDetail}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
