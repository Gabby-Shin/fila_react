import { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel.jsx';
import LookSlider from '../components/LookSlider.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import Popup from '../components/Popup.jsx';
import { heroSlides, homeImages, products, trendTabs } from '../data/products.js';

function Home({ onNavigate, onProductDetail }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTrend, setActiveTrend] = useState(trendTabs[0].id);
  const activeTrendIndex = trendTabs.findIndex((tab) => tab.id === activeTrend);
  const visibleProducts = products.filter((product) => product.trendCategory === activeTrend);
  const trendingProducts = Array.from({ length: 5 }, (_, index) => {
    const baseProduct = visibleProducts[index % visibleProducts.length] || products[index % products.length];

    return {
      ...baseProduct,
      viewId: `${activeTrend}-${index}`,
    };
  });

  const moveTrend = (direction) => {
    const nextIndex = (activeTrendIndex + direction + trendTabs.length) % trendTabs.length;
    setActiveTrend(trendTabs[nextIndex].id);
  };

  return (
    <>
      <section className="hero_section">
        <HeroCarousel slides={heroSlides} />
      </section>

      <section className="trending_section">
        <h2>Trending Now</h2>

        <div>
          <ul className="list">
            {trendTabs.map((tab) => (
              <li key={tab.id}>
                <button
                  className={tab.id === activeTrend ? 'trend_btn active' : 'trend_btn'}
                  type="button"
                  data-category={tab.id}
                  onClick={() => setActiveTrend(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="button_container">
            <button
              className="arrow_button border rounded"
              type="button"
              aria-label="Previous category"
              onClick={() => moveTrend(-1)}
            >
              {'<'}
            </button>
            <button
              className="arrow_button border rounded"
              type="button"
              aria-label="Next category"
              onClick={() => moveTrend(1)}
            >
              {'>'}
            </button>
          </div>
        </div>

        <div className="product_list">
          <ul id="trendingProductList">
            {trendingProducts.map((product) => (
              <li key={product.viewId} data-category={product.trendCategory}>
                <a
                  href="#product-detail"
                  onClick={(event) => {
                    event.preventDefault();
                    onProductDetail(product);
                  }}
                >
                  <div className="image_container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="list_info">
                    <span>
                      <p>{product.category}</p>
                      <strong>{product.name}</strong>
                      <b>{product.price}</b>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="edit_section">
        <div className="image_container">
          <img className="main" src={homeImages.editMain} alt="FILA editorial model" />
          <img className="sub" src={homeImages.editSub} alt="FILA sneakers" />
        </div>
        <div className="label_container">
          <h2>Fila Edit</h2>
          <div>
            {['Daily,', 'ARC,', 'Seoul,', 'Tennis,', 'Speed-Serve 2.0', 'Windbreaker,' ,'실릭 실루엣,', 'Heritage,','썸머 슈즈,','Holiday'].map((label) => (
              <button type="button" key={label} onClick={() => onNavigate('products')}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="information1_section">
        <h3>
          The beginning of FILA
          <br />
          1911 & Everyday
        </h3>
        <div>
          <article className="info_card">
            <img src={homeImages.info1} alt="FILA tennis style guide" />
            <span className="information">
              <h4>Control The Court</h4>
              <p>코트 위 움직임을 위해 설계된 FILA tennis style.</p>
            </span>
            <PrimaryButton className="white-button" onClick={() => onNavigate('products')}>
              View
            </PrimaryButton>
          </article>
          <article className="info_card">
            <img src={homeImages.info2} alt="FILA active style guide" />
            <span className="information">
              <h4>Pace Your Day</h4>
              <p>일상부터 퍼포먼스까지 편안하게 이어지는 컬렉션.</p>
            </span>
            <PrimaryButton className="white-button" onClick={() => onNavigate('products')}>
              View
            </PrimaryButton>
          </article>
        </div>
      </section>

      <section className="information4_section">
        <div>
          <h2>Shop the Look</h2>
          <button
            type="button"
            className="arrow_button arrow-button rounded information4_button"
            onClick={() => onNavigate('products')}
          >
            <span>더보기</span>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
        <LookSlider
          images={homeImages.flow}
          onItemClick={(imageIndex) => {
            if (imageIndex === 0) {
              setIsPopupOpen(true);
            }
          }}
        />
      </section>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

export default Home;
