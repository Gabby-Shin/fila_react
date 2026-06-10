import { useState } from 'react';
import logo from '../assets/images/fila-logo.png';
import cartItem1 from '../assets/images/cart-item-1.webp';
import cartItem2 from '../assets/images/cart-item-2.webp';

const initialCartItems = [
  {
    id: 1,
    image: cartItem1,
    name: 'AIRism Cotton Oversize Crew Neck T',
    color: '09 Black',
    size: 'MEN M',
    price: 14900,
    info: ['Recycled material', 'UNISEX'],
  },
  {
    id: 2,
    image: cartItem2,
    name: 'AIRism Cotton T',
    color: '00 White',
    size: 'WOMEN M',
    price: 14900,
    info: [],
  },
];

const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

function Cart() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [quantities, setQuantities] = useState(
    Object.fromEntries(initialCartItems.map((item) => [item.id, 1])),
  );
  const allSelected = selectedIds.length === initialCartItems.length;
  const selectedItems = initialCartItems.filter((item) => selectedIds.includes(item.id));
  const productTotal = selectedItems.reduce((total, item) => total + item.price * quantities[item.id], 0);
  const deliveryFee = productTotal > 0 ? 3000 : 0;
  const orderTotal = productTotal + deliveryFee;

  const handleSelectAll = (event) => {
    setSelectedIds(event.target.checked ? initialCartItems.map((item) => item.id) : []);
  };

  const handleSelectItem = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id],
    );
  };

  const changeQuantity = (id, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] + amount),
    }));
  };

  return (
    <div className="cart-page">
      <section className="header">
        <div className="header_container">
          <img src={logo} alt="FILA logo" />
          <span className="cart-user-icon">가희쨩</span>
        </div>
      </section>

      <section className="cart_header">
        <h2>장바구니</h2>
        <div className="cart_select_area">
          <label>
            <input type="checkbox" id="selectAll" checked={allSelected} onChange={handleSelectAll} />
            전체선택
          </label>
        </div>
      </section>

      <form action="#" className="cart_container">
        <section className="cart_list">
          {initialCartItems.map((item) => (
            <section className="cart_item" key={item.id}>
              <input
                type="checkbox"
                className="cart_check"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
              <div className="image_container">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart_item_info">
                <div className="cart_item_info_header">
                  <span>{item.name}</span>
                  <button className="cancle" type="button" onClick={() => handleSelectItem(item.id)}>
                    x
                  </button>
                </div>
                <div className="size">
                  <div>컬러: {item.color}</div>
                  <div>사이즈: {item.size}</div>
                </div>
                <div className="price">{formatPrice(item.price)}</div>
                {item.info.length > 0 && (
                  <div className="info">
                    {item.info.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                )}
                <div className="quantity">
                  <button type="button" onClick={() => changeQuantity(item.id, -1)}>
                    -
                  </button>
                  <input type="text" value={quantities[item.id]} readOnly />
                  <button type="button" onClick={() => changeQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            </section>
          ))}

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
              <div>10,100원 추가 구매 시 무료배송</div>
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
