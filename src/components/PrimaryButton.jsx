function PrimaryButton({ children, onClick, className = '' }) {
  return (
    <button className={`primary-button ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
