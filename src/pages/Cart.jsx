import { useState, useEffect } from 'react';
import logo from '../assets/images/fila-logo.png';

const formatPrice = (price) => {
  if (typeof price === 'string') return price;
  return `${price.toLocaleString('ko-KR')}원`;
};

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseInt(price.replace(/[^0-9]/g, ''), 10);
};

function Cart({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Sync selectedIds with cartItems when items are removed
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

  return (
    <div className="cart-page">
      <section className="header">
        <div className="header_container">
          <img src={logo} alt="FILA logo" />
        </div>
      </section>

      <section className="cart_header">
        <h2>장바구니</h2>
        <div className="cart_select_area">
          <label>
            <input
              type="checkbox"
              id="selectAll"
              checked={allSelected}
              onChange={handleSelectAll}
            />
            전체선택
          </label>
        </div>
      </section>

      <form action="#" className="cart_container" onSubmit={(e) => e.preventDefault()}>
        <section className="cart_list">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message" style={{ padding: '80px 0', textAlign: 'center', gridColumn: '1 / 2' }}>
              장바구니가 비어 있습니다.
            </div>
          ) : (
            cartItems.map((item) => (
              <section className="cart_item" key={item.uniqueId}>
                <input
                  type="checkbox"
                  className="cart_check"
                  checked={selectedIds.includes(item.uniqueId)}
                  onChange={() => handleSelectItem(item.uniqueId)}
                />
                <div className="image_container">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart_item_info">
                  <div className="cart_item_info_header">
                    <span>{item.name}</span>
                    <button
                      className="cancel"
                      type="button"
                      onClick={() => onRemoveFromCart(item.uniqueId)}
                    >
                      x
                    </button>
                  </div>
                  <div className="size">
                    <div>컬러: {item.color || 'Default'}</div>
                    <div>사이즈: {item.size}</div>
                  </div>
                  <div className="price">{formatPrice(item.price)}</div>
                  {item.info && item.info.length > 0 && (
                    <div className="info">
                      {item.info.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  )}
                  <div className="quantity">
                    <button type="button" onClick={() => onUpdateQuantity(item.uniqueId, -1)}>
                      -
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button type="button" onClick={() => onUpdateQuantity(item.uniqueId, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </section>
            ))
          )}

          <section className="cart_summary">
            <section className="cart_info">
              <div className="cart_detail">
                <h3>주문 상세내역</h3>
                <div>{selectedItems.length} 상품</div>
              </div>
              <div className="cart_total">
                <div>상품 합계</div>
                <div>{formatPrice(productTotal)}</div>
              </div>
              <div className="cart_delivery">
                <div>배송비</div>
                <div>{formatPrice(deliveryFee)}</div>
              </div>
              <div className="cart_detail">
                <h3>총 결제금액</h3>
                <div>{formatPrice(orderTotal)}</div>
              </div>
              <div className="cart_total">
                <div>세금(VAT)</div>
                <div>{formatPrice(Math.floor(orderTotal / 11))}</div>
              </div>
            </section>

            <div className="coupon">
              <div>쿠폰</div>
              <span>&gt;</span>
            </div>

            <div className="cart_footer">
              <div>
                {productTotal < 50000 && productTotal > 0
                  ? `${(50000 - productTotal).toLocaleString()}원 추가 구매 시 무료배송`
                  : '무료배송 적용됨'}
              </div>
              <a href="#recommend">추천 상품 보기 &gt;</a>
              <div>주문하기 버튼을 누른 뒤 30분간 재고가 임시 확보됩니다.</div>
              <button type="button">주문하기</button>
            </div>
          </section>
        </section>
      </form>
    </div>
  );
}

export default Cart;
