import { useState } from 'react';
import popupImage from '../assets/images/main-hero.webp';
import popupItem1 from '../assets/images/popup-item-1.webp';
import popupItem2 from '../assets/images/popup-item-2.webp';

const popupProducts = [
  {
    id: 1,
    image: popupItem1,
    name: 'Echappe Velvet Mary Jane Choco',
    option: 'BROWN, BROWN, BROWN',
    price: 99900,
    sizes: ['230', '235', '240', '245', '250', '255'],
  },
  {
    id: 2,
    image: popupItem2,
    name: 'Echappe Velvet Mary Jane',
    option: 'BLACK, BLACK, BLACK',
    price: 99000,
    sizes: ['230', '235', '240', '245'],
  },
];

const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

function Popup({ isOpen, onClose }) {
  const [checkedIds, setCheckedIds] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const allChecked = checkedIds.length === popupProducts.length;
  const totalPrice = popupProducts
    .filter((product) => checkedIds.includes(product.id))
    .reduce((total, product) => total + product.price, 0);

  const handleCheckAll = (event) => {
    setCheckedIds(event.target.checked ? popupProducts.map((product) => product.id) : []);
  };

  const handleItemCheck = (id) => {
    setCheckedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((checkedId) => checkedId !== id)
        : [...prevIds, id],
    );
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  return (
    <div
      id="popupOverlay"
      className={isOpen ? 'popup_overlay active' : 'popup_overlay'}
      onClick={(event) => {
        if (event.target.id === 'popupOverlay') {
          onClose();
        }
      }}
    >
      <div className="popup">
        <div className="popup_left">
          <img src={popupImage} alt="FILA popup campaign" />
        </div>

        <div className="popup_right">
          <div>
            <div className="check">
              <label className="check_all">
                <input type="checkbox" id="checkAll" checked={allChecked} onChange={handleCheckAll} />
                <span className="check_box" />
                <span>전체선택</span>
              </label>

              <button type="button" className="close_btn" onClick={onClose} aria-label="Close popup">
                x
              </button>
            </div>
          </div>

          <div className="product_list">
            {popupProducts.map((product) => (
              <div className="product" key={product.id}>
                <label className="product_top">
                  <input
                    type="checkbox"
                    className="item_check"
                    checked={checkedIds.includes(product.id)}
                    onChange={() => handleItemCheck(product.id)}
                  />
                  <span className="check_box" />

                  <img src={product.image} alt={product.name} />
                  <div className="info">
                    <b>{product.name}</b>
                    <span>{product.option}</span>
                    <strong>{formatPrice(product.price)}</strong>
                  </div>
                </label>

                <details className="accordion">
                  <summary>
                    <span>{selectedSizes[product.id] || '사이즈 선택'}</span>
                    <span>v</span>
                  </summary>

                  <div className="size_box">
                    {product.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={selectedSizes[product.id] === size ? 'active' : ''}
                        onClick={() => handleSizeSelect(product.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="total">
            <div className="price">
              <span>주문금액</span>
              <b>{formatPrice(totalPrice)}</b>
            </div>
            <button className="cart_btn" type="button">
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
