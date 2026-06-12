function CartQuantityControl({ itemName, onDecrease, onIncrease, quantity }) {
  return (
    <div className="cart-quantity-control" role="group" aria-label={`${itemName} 수량`}>
      <button
        aria-label={`${itemName} 수량 감소`}
        disabled={quantity <= 1}
        onClick={onDecrease}
        type="button"
      >
        -
      </button>
      <span aria-live="polite">{quantity}</span>
      <button aria-label={`${itemName} 수량 증가`} onClick={onIncrease} type="button">
        +
      </button>
    </div>
  );
}

export default CartQuantityControl;
