function CartCheckbox({ checked, className = '', id, label, onChange }) {
  return (
    <label className={`cart-ui-checkbox ${className}`.trim()} htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="cart-ui-checkbox__box" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
}

export default CartCheckbox;
