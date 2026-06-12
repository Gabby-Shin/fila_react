function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card" itemScope itemType="https://schema.org/Product">
      <button
        className="product-image"
        type="button"
        aria-label={`${product.name} product detail`}
        onClick={() => onSelect(product)}
      >
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" itemProp="image" />
      </button>
      <div className="product-info">
        <span className="tag" itemProp="category">{product.category}</span>
        <h3 itemProp="name">{product.name}</h3>
        <strong itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="KRW" />
          <span itemProp="price">{product.price}</span>
        </strong>
        <button type="button" onClick={() => onSelect(product)}>
          자세히 보기
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
