function CartButton({
  children,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  variant = 'outline',
  ...buttonProps
}) {
  return (
    <button
      className={`cart-ui-button cart-ui-button--${variant} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default CartButton;
