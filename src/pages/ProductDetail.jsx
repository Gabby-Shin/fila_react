import { products } from '../data/products.js';
import CheckpointSection from '../components/CheckpointSection.jsx';
import ModelCutSection from '../components/ModelCutSection.jsx';
import ProductReviews from '../components/ProductReviews.jsx';

const sizes = ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)'];

function ProductDetail({ selectedProduct, onNavigate }) {
  const product = selectedProduct || products[0];

  return (
    <section className="detail-page">
      <section className="detail-main">
        <div className="detail-main-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-main-info">
          <div className="detail-info-box">
            <div className="detail-tags">
              <span>신상품</span>
              <span>{product.category}</span>
            </div>

            <h1>{product.name}</h1>

            <div className="thumb-group">
              {products.slice(0, 3).map((item) => (
                <button key={item.id} type="button">
                  <img src={item.image} alt={item.name} />
                </button>
              ))}
            </div>

            <details className="size-accordion">
              <summary>
                <strong>사이즈 선택</strong>
                <span>v</span>
              </summary>
              <div>
                {sizes.map((size) => (
                  <button key={size} type="button">
                    {size}
                  </button>
                ))}
              </div>
            </details>

            <button className="cart-button" type="button">
              <strong>카트에 추가</strong>
              <strong>{product.price}</strong>
            </button>
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-image-grid">
          {product.detailImages.map((image, index) => (
            <img key={image} src={image} alt={`${product.name} detail ${index + 1}`} />
          ))}
        </div>

        <div className="detail-text">
          <p>
            가볍고 편안한 착용감에 FILA 특유의 스포티한 무드를 더했습니다.
            데일리 스타일과 활동적인 움직임을 모두 고려한 상품입니다.
          </p>
          <p className="sub-text">색상 : BLACK / WHITE</p>
          <p className="sub-text">상품코드 : {product.code}</p>

          <details>
            <summary>멤버십 혜택</summary>
            <ul>
              <li>신규 회원 할인 쿠폰 제공</li>
              <li>리뷰 작성 시 포인트 적립</li>
              <li>FILA 공식몰 회원 전용 이벤트</li>
            </ul>
          </details>

          <details>
            <summary>상품 정보 고시</summary>
            <div className="product-notice">
              <span>소재</span>
              <span>폴리에스터, 면 혼방</span>
              <span>제조국</span>
              <span>베트남</span>
              <span>A/S</span>
              <span>FILA 고객센터 1577-3472</span>
            </div>
          </details>

          <button className="back-list-button" type="button" onClick={() => onNavigate('products')}>
            목록으로 돌아가기
          </button>
        </div>
      </section>

      <CheckpointSection />
      <ModelCutSection />
      <ProductReviews />
    </section>
  );
}

export default ProductDetail;
