const arrowPaths = {
  left: 'M20 12H5m7-7-7 7 7 7',
  right: 'M4 12h15m-7-7 7 7-7 7',
  up: 'm5 15 7-7 7 7',
  down: 'm5 9 7 7 7-7',
};

export function ArrowIcon({ direction = 'right', className = '' }) {
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={arrowPaths[direction] || arrowPaths.right} />
    </svg>
  );
}

function ArrowButton({
  direction = 'right',
  onClick,
  label,
  className = '',
  children,
  type = 'button',
  ...buttonProps
}) {
  const hasText = children !== undefined && children !== null;

  return (
    <button
      className={`arrow-button arrow_button ${hasText ? 'arrow-button--with-text' : 'arrow-button--icon-only'} ${className}`.trim()}
      type={type}
      onClick={onClick}
      aria-label={label}
      {...buttonProps}
    >
      {hasText && children}
      <ArrowIcon direction={direction} />
    </button>
  );
}

export default ArrowButton;
