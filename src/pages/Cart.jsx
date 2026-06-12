import { useEffect, useState } from 'react';
import CartButton from '../components/cart/CartButton.jsx';
import CartCheckbox from '../components/cart/CartCheckbox.jsx';
import CartDeliveryTabs from '../components/cart/CartDeliveryTabs.jsx';
import CartItemRow from '../components/cart/CartItemRow.jsx';
import CartSummaryFooter from '../components/cart/CartSummaryFooter.jsx';
import logo from '../assets/images/fila-logo.png';

const formatPrice = (price) => {
  if (typeof price === 'string') return price;
  return `${price.toLocaleString('ko-KR')}원`;
};

const parsePrice = (price) => {
  if (typeof price === 'number') return price;

  const parsedPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
  return Number.isNaN(parsedPrice) ? 0 : parsedPrice;
};

function Cart({
  cartItems = [],
  onNavigate,
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const [activeDeliveryTab, setActiveDeliveryTab] = useState('standard');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setSelectedIds((prevSelected) =>
      prevSelected.filter((uniqueId) => cartItems.some((item) => item.uniqueId === uniqueId)),
    );
  }, [cartItems]);

  const allSelected = cartItems.length > 0 && selectedIds.length === cartItems.length;
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.uniqueId));
  const productTotal = selectedItems.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0,
  );
  const deliveryFee = productTotal > 0 && productTotal < 50000 ? 3000 : 0;
  const orderTotal = productTotal + deliveryFee;
  const vat = Math.floor(orderTotal / 11);

  const handleSelectAll = (event) => {
    setSelectedIds(event.target.checked ? cartItems.map((item) => item.uniqueId) : []);
  };

  const handleSelectItem = (uniqueId) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(uniqueId)
        ? prevIds.filter((id) => id !== uniqueId)
        : [...prevIds, uniqueId],
    );
  };

  const handleRemoveSelected = () => {
    if (selectedIds.length === 0) {
      alert('삭제할 상품을 선택해 주세요.');
      return;
    }

    selectedIds.forEach((uniqueId) => onRemoveFromCart(uniqueId));
  };

  const handleRemoveSoldOut = () => {
    const soldOutItems = cartItems.filter((item) => item.soldOut);

    if (soldOutItems.length === 0) {
      alert('품절 상품이 없습니다.');
      return;
    }

    soldOutItems.forEach((item) => onRemoveFromCart(item.uniqueId));
  };

  const handleOptionChange = () => {
    alert('옵션 변경은 상품 상세 페이지에서 진행해 주세요.');
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택해 주세요.');
      return;
    }

    alert('주문 기능은 준비 중입니다.');
  };

  const handleClose = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('home');
    }
  };

  return (
    <div className="cart-page" aria-labelledby="cart-heading">
      <section className="header" aria-label="FILA cart header">
        <div className="header_container">
          <img src={logo} alt="FILA logo" width="256" height="256" decoding="async" />
        </div>
      </section>

      <section className="cart_header" aria-labelledby="cart-heading">
        <div className="cart_header_text">
          <h2 id="cart-heading">장바구니</h2>
          <p>상품이 장바구니에 성공적으로 담겼습니다!</p>
        </div>
        <button
          aria-label="장바구니 닫기"
          className="cart_close_button"
          onClick={handleClose}
          type="button"
        >
          ×
        </button>
        <CartDeliveryTabs
          activeTab={activeDeliveryTab}
          itemCount={cartItems.length}
          onChange={setActiveDeliveryTab}
        />
      </section>

      <form action="#" className="cart_container" aria-label="Shopping cart" onSubmit={(event) => event.preventDefault()}>
        <section className="cart_select_area" aria-label="Cart selection tools">
          <CartCheckbox
            checked={allSelected}
            id="selectAll"
            label={`담긴 상품 ${cartItems.length}개`}
            onChange={handleSelectAll}
          />
          <div className="cart_select_actions">
            <CartButton onClick={handleRemoveSelected} variant="text">
              선택 삭제
            </CartButton>
            <CartButton onClick={handleRemoveSoldOut} variant="text">
              품절 삭제
            </CartButton>
          </div>
        </section>

        <section className="cart_list" aria-live="polite" aria-label="Cart item list">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <strong>장바구니가 비어 있습니다.</strong>
              <p>마음에 드는 상품을 담아보세요.</p>
              <CartButton onClick={() => onNavigate?.('products')} variant="primary">
                상품 보러가기
              </CartButton>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItemRow
                formatPrice={formatPrice}
                item={item}
                key={item.uniqueId}
                onOptionChange={handleOptionChange}
                onRemove={onRemoveFromCart}
                onSelect={handleSelectItem}
                onUpdateQuantity={onUpdateQuantity}
                selected={selectedIds.includes(item.uniqueId)}
              />
            ))
          )}
        </section>

        <CartSummaryFooter
          deliveryFee={deliveryFee}
          formatPrice={formatPrice}
          onCheckout={handleCheckout}
          orderTotal={orderTotal}
          productTotal={productTotal}
          selectedCount={selectedItems.length}
          vat={vat}
        />
      </form>
    </div>
  );
}

export default Cart;
