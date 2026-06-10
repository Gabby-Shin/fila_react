function ArrowButton({ direction = 'right', onClick, label, className = '' }) {
  return (
    <button
      className={`arrow-button arrow_button border rounded ${className}`.trim()}
      type="button"
      onClick={onClick}
      aria-label={label}
    >
      {direction === 'left' ? '<' : '>'}
    </button>
  );
}

export default ArrowButton;
