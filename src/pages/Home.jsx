import { useState } from 'react';
import ArrowButton from '../components/ArrowButton.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import LookSlider from '../components/LookSlider.jsx';
import Popup from '../components/Popup.jsx';
import heritageImage from '../assets/images/info-heritage-side.png';
import { heroSlides, homeImages, products, trendTabs } from '../data/products.js';

function Home({ onNavigate, onProductDetail, onAddToCart }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(homeImages.flow[0]);
  const [activeTrend, setActiveTrend] = useState(trendTabs[0].id);
  const [slideIndex, setSlideIndex] = useState(0);

  const activeTrendIndex = trendTabs.findIndex((tab) => tab.id === activeTrend);
  const visibleProducts = products.filter((product) => product.trendCategory === activeTrend);

  const trendingProducts = Array.from({ length: 10 }, (_, index) => {
    const baseProduct = visibleProducts[index % visibleProducts.length] || products[index % products.length];

    return {
      ...baseProduct,
      viewId: `${activeTrend}-${index}`,
    };
  });

  const handleTrendChange = (id) => {
    setActiveTrend(id);
    setSlideIndex(0);
  };

  const moveSlide = (direction) => {
    const maxIndex = trendingProducts.length - 4;
    setSlideIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next > maxIndex) return maxIndex;
      return next;
    });
  };

  return (
    <>
      <section className="hero_section" aria-label="FILA main promotion">
        <HeroCarousel slides={heroSlides} />
      </section>

      <section className="trending_section" aria-labelledby="trending-heading">
        <h2 id="trending-heading">Trending Now</h2>

        <div aria-label="Trending product categories">
          <ul className="list" role="list">
            {trendTabs.map((tab) => (
              <li key={tab.id}>
                <button
                  className={tab.id === activeTrend ? 'trend_btn active' : 'trend_btn'}
                  type="button"
                  data-category={tab.id}
                  aria-pressed={tab.id === activeTrend}
                  aria-controls="trendingProductList"
                  onClick={() => handleTrendChange(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="button_container">
            <ArrowButton
              className="border rounded"
              direction="left"
              label="Previous products"
              onClick={() => moveSlide(-1)}
            />
            <ArrowButton
              className="border rounded"
              label="Next products"
              onClick={() => moveSlide(1)}
            />
          </div>
        </div>

        <div className="product_list" aria-live="polite" style={{ overflow: 'hidden' }}>
          <ul
            id="trendingProductList"
            aria-label="Trending products"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              transform: `translateX(calc(var(--trend-slide-step, 20%) * -${slideIndex}))`,
              transition: 'transform 0.5s ease',
            }}
          >
            {trendingProducts.map((product) => (
              <li
                key={product.viewId}
                data-category={product.trendCategory}
                itemScope
                itemType="https://schema.org/Product"
                style={{ flex: '0 0 var(--trend-card-width, 20%)', padding: '0 var(--trend-card-gutter, 10px)' }}
              >
                <a
                  href="#product-detail"
                  aria-label={`${product.name} 상품 상세 보기`}
                  onClick={(event) => {
                    event.preventDefault();
                    onProductDetail(product);
                  }}
                >
                  <div className="image_container">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 480px) 40vw, (max-width: 768px) 33vw, 25vw"
                      itemProp="image"
                    />
                  </div>
                  <div className="list_info">
                    <span>
                      <p itemProp="category">{product.category}</p>
                      <strong itemProp="name">{product.name}</strong>
                      <b itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="KRW" />
                        <span itemProp="price">{product.price}</span>
                      </b>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="edit_section" aria-labelledby="fila-edit-heading">
        <div className="image_container">
          <img
            className="main"
            src={homeImages.editMain}
            alt="FILA editorial model"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <img
            className="sub"
            src={homeImages.editSub}
            alt="FILA sneakers"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="label_container">
          <h2 id="fila-edit-heading">Fila Edit</h2>
          <div>
            {['Daily,', 'ARC,', 'Seoul,', 'Tennis,', 'Speed-Serve 2.0', 'Windbreaker,' ,'실릭 실루엣,', 'Heritage,','썸머 슈즈,','Holiday'].map((label) => (
              <button
                type="button"
                key={label}
                aria-label={`${label} 상품 보기`}
                onClick={() => onNavigate('products')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="information1_section" aria-labelledby="fila-history-heading">
        <h3 id="fila-history-heading">
          The beginning of FILA
          <br />
          1911 & Everyday
        </h3>
        <div>
          <article className="info_card">
            <img
              src={homeImages.info1}
              alt="FILA tennis style guide"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 480px) 100vw, 50vw"
            />
            <span className="information">
              <h4>Control The Court</h4>
              <p>코트 위 움직임을 위해 설계된 FILA tennis style.</p>
            </span>
            <ArrowButton
              className="white-button rounded information1_arrow"
              label="View Control The Court"
              onClick={() => onNavigate('products')}
            />
          </article>
          <article className="info_card">
            <img
              src={homeImages.info2}
              alt="FILA heritage collection"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 480px) 100vw, 50vw"
            />
            <span className="information">
              <h4>Pace Your Day</h4>
              <p>일상부터 퍼포먼스까지 편안하게 이어지는 컬렉션.</p>
            </span>
            <ArrowButton
              className="white-button rounded information1_arrow"
              label="View Pace Your Day"
              onClick={() => onNavigate('products')}
            />
          </article>
        </div>
      </section>

      <section className="heritage_split_section" aria-labelledby="heritage-heading">
        <article className="heritage_split_card" itemScope itemType="https://schema.org/Brand">
          <div className="heritage_split_content">
            <div className="heritage_split_logo" aria-hidden="true" />
            <p>FILA 아카이브를 기반으로 브랜드의 클래식한 정체성을 담아낸 헤리티지 컬렉션을 소개합니다.</p>
            <strong id="heritage-heading" itemProp="name">1911 & Everyday Since</strong>
            <ArrowButton
              className="white-button rounded heritage_split_arrow"
              label="View heritage collection"
              onClick={() => onNavigate('products')}
            />
          </div>
          <img
            src={heritageImage}
            alt="FILA heritage collection"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 480px) 100vw, 48vw"
            itemProp="image"
          />
        </article>
      </section>

      <section className="information4_section" aria-labelledby="shop-look-heading">
        <div>
          <h2 id="shop-look-heading">Shop the Look</h2>
          <ArrowButton
            type="button"
            className="arrow_button arrow-button rounded information4_button"
            label="View Shop the Look products"
            onClick={() => onNavigate('products')}
          >
            <span>더보기</span>
          </ArrowButton>
        </div>
        <LookSlider
          images={homeImages.flow}
          onItemClick={(imageIndex) => {
            setPopupImage(homeImages.flow[imageIndex]);
            setIsPopupOpen(true);
          }}
        />
      </section>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        popupImage={popupImage}
        onAddToCart={onAddToCart}
      />
    </>
  );
}

export default Home;
