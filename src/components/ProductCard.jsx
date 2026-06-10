function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card">
      <button className="product-image" type="button" onClick={() => onSelect(product)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-info">
        <span className="tag">{product.category}</span>
        <h3>{product.name}</h3>
        <strong>{product.price}</strong>
        <button type="button" onClick={() => onSelect(product)}>
          자세히 보기
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
