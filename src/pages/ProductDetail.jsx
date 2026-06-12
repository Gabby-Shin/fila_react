import { useEffect, useState } from 'react';
import { ArrowIcon } from '../components/ArrowButton.jsx';
import { products } from '../data/products.js';
import CheckpointSection from '../components/CheckpointSection.jsx';
import ModelCutSection from '../components/ModelCutSection.jsx';
import ProductReviews from '../components/ProductReviews.jsx';

const sizes = ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)'];

function ProductDetail({ selectedProduct, onNavigate, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const product = selectedProduct || products[0];
  const detailSlides = [product.image, ...product.detailImages];

  useEffect(() => {
    setActiveSlide(0);
  }, [product.id]);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
  };

  const moveSlide = (direction) => {
    setActiveSlide((currentIndex) => {
      const nextIndex = currentIndex + direction;
      if (nextIndex < 0) return detailSlides.length - 1;
      if (nextIndex >= detailSlides.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section className="detail-page" aria-labelledby="product-detail-heading" itemScope itemType="https://schema.org/Product">
      <section className="detail-main" aria-labelledby="product-detail-heading">
        <div className="detail-main-image">
          <img
            className="detail-main-image__desktop"
            src={product.image}
            alt={product.name}
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 1024px) 50vw, 50vw"
            itemProp="image"
          />
          <div
            className="detail-mobile-slider"
            role="group"
            aria-roledescription="carousel"
            aria-label={`${product.name} image slide`}
          >
            <div
              className="detail-mobile-slider__track"
              aria-live="polite"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {detailSlides.map((image, index) => (
                <div
                  className="detail-mobile-slider__slide"
                  key={`${image}-${index}`}
                  role="group"
                  aria-label={`${index + 1} / ${detailSlides.length}`}
                  aria-hidden={activeSlide !== index}
                >
                  <img
                    src={image}
                    alt={index === 0 ? product.name : `${product.name} detail ${index}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
            <button
              aria-label="Previous detail image"
              className="detail-mobile-slider__button detail-mobile-slider__button--prev"
              onClick={() => moveSlide(-1)}
              type="button"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              aria-label="Next detail image"
              className="detail-mobile-slider__button detail-mobile-slider__button--next"
              onClick={() => moveSlide(1)}
              type="button"
            >
              <ArrowIcon />
            </button>
            <div className="detail-mobile-slider__dots" aria-label="Detail image pagination">
              {detailSlides.map((image, index) => (
                <button
                  aria-label={`Show detail image ${index + 1}`}
                  aria-current={activeSlide === index ? 'true' : undefined}
                  className={activeSlide === index ? 'active' : ''}
                  key={`dot-${image}-${index}`}
                  onClick={() => setActiveSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="detail-main-info">
          <div className="detail-info-box">
            <div className="detail-tags">
              <span>신상품</span>
              <span>{product.category}</span>
            </div>

            <h1 id="product-detail-heading" itemProp="name">{product.name}</h1>
            <meta itemProp="sku" content={product.code} />

            <div className="thumb-group">
              {products.slice(0, 3).map((item) => (
                <button key={item.id} type="button">
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            <details className="size-accordion">
              <summary>
                <strong>사이즈 선택 {selectedSize && `(${selectedSize})`}</strong>
                <ArrowIcon direction="down" className="summary-arrow-icon" />
              </summary>
              <div>
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? 'active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </details>

            <button
              className="cart-button"
              type="button"
              aria-label={`${product.name} add to cart`}
              onClick={handleAddToCart}
            >
              <strong>카트에 추가</strong>
              <strong itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="KRW" />
                <span itemProp="price">{product.price}</span>
              </strong>
            </button>
          </div>
        </div>
      </section>

      <section className="detail-content" aria-label="Product detail information">
        <div className="detail-image-grid">
          {product.detailImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${product.name} detail ${index + 1}`}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>

        <div className="detail-text" itemProp="description">
          <p>
            가볍고 통기성이 뛰어난 파워넷 소재로 제작된 스커트는 움직일 때마다 우아하게 흩날리는 실루엣을 연출해줍니다. 레이어드 디자인으로 풍성한 볼륨감을 더했으며, 다채로운 컬러감이 생동감을 더해줍니다. 코트 위에서 건강하고 우아한 플레이를 완성해보세요. 립조직 소재는 세로 골지 구조로 신축성과 복원력이 뛰어나 착용 시 편안한 착용감을 제공합니다. 몸에 자연스럽게 밀착되어 슬림한 실루엣을 연출하며, 활동성 또한 우수해 다양한 움직임에도 안정적인 착용이 가능합니다. 활동성을 갖춘 디자인에 여성스러운 실루엣이 더해진 테니스 원피스입니다. 허리를 슬림하게 연출해주는 디자인으로 탄탄하고 정돈된 인상을 주며, 가볍고 쾌적한 소재로 부담 없이 착용 가능합니다. 코트 위에서도 클래식하고 건강한 아름다움을 표현해주는 아이템입니다.
          </p>
          <p className="sub-text">색상 : BLACK / WHITE</p>
          <p className="sub-text">상품코드 : {product.code}</p>

          <details>
            <summary>멤버십 혜택
              <ArrowIcon direction="down" className="summary-arrow-icon" />
            </summary>
            <ul>
              <li>신규 회원 할인 쿠폰 제공</li>
              <li>리뷰 작성 시 포인트 적립</li>
              <li>FILA 공식몰 회원 전용 이벤트</li>
            </ul>
          </details>

          <details>
            <summary>상품 정보 고시
              <ArrowIcon direction="down" className="summary-arrow-icon" />
            </summary>
            <div className="product-notice">
              <span>소재</span>
              <span>폴리에스터, 면 혼방</span>
              <span>제조국</span>
              <span>베트남</span>
              <span>A/S</span>
              <span>FILA 고객센터 1577-3472</span>
            </div>
          </details>

          <button
            className="back-list-button"
            type="button"
            aria-label="Back to product list"
            onClick={() => onNavigate('products')}
          >
            목록으로 돌아가기
          </button>
        </div>
      </section>

      <CheckpointSection />
      <ModelCutSection />
      <ProductReviews onNavigate={onNavigate} />
    </section>
  );
}

export default ProductDetail;
