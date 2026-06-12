import CartButton from './CartButton.jsx';
import CartCheckbox from './CartCheckbox.jsx';
import CartQuantityControl from './CartQuantityControl.jsx';

function CartItemRow({
  formatPrice,
  item,
  onOptionChange,
  onRemove,
  onSelect,
  onUpdateQuantity,
  selected,
}) {
  const colorText = item.color ? item.color.replace(/\s*,\s*/g, ' / ') : 'Default';
  const optionText = `${colorText}, ${item.size}`;
  const optionChangeLabel = '옵션변경';

  return (
    <article className="cart-item-row" itemScope itemType="https://schema.org/Product">
      <CartCheckbox
        checked={selected}
        className="cart-item-row__checkbox"
        id={`cart-item-${item.uniqueId}`}
        onChange={() => onSelect(item.uniqueId)}
      />

      <div className="cart-item-row__image">
        <img src={item.image} alt={item.name} loading="lazy" decoding="async" itemProp="image" />
      </div>

      <div className="cart-item-row__info">
        <div className="cart-item-row__title">
          <h3 itemProp="name">{item.name}</h3>
          <CartButton
            className="cart-item-row__option-desktop"
            onClick={() => onOptionChange(item)}
            variant="outline-small"
          >
            {optionChangeLabel}
          </CartButton>
        </div>
        <p>{optionText}</p>
        {item.info && item.info.length > 0 && (
          <div className="cart-item-row__note">
            {item.info.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}
        <strong itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="KRW" />
          <span itemProp="price">{formatPrice(item.price)}</span>
        </strong>
      </div>

      <button
        aria-label={`${item.name} 삭제`}
        className="cart-item-row__remove"
        onClick={() => onRemove(item.uniqueId)}
        type="button"
      >
        ×
      </button>

      <div className="cart-item-row__controls">
        <CartQuantityControl
          itemName={item.name}
          onDecrease={() => onUpdateQuantity(item.uniqueId, -1)}
          onIncrease={() => onUpdateQuantity(item.uniqueId, 1)}
          quantity={item.quantity}
        />
        <CartButton
          className="cart-item-row__option-mobile"
          onClick={() => onOptionChange(item)}
          variant="outline-small"
        >
          {optionChangeLabel}
        </CartButton>
      </div>
    </article>
  );
}

export default CartItemRow;
