import { useMemo, useState } from 'react';
import ArrowButton, { ArrowIcon } from '../components/ArrowButton.jsx';
import { products } from '../data/products.js';
import listThumb1 from '../assets/images/list-thumb-1.webp';
import listThumb2 from '../assets/images/list-thumb-2.webp';
import listHover from '../assets/images/list-hover.webp';

const filters = [
  '전체보기',
  '반팔',
  '바람막이/집업',
  '맨투맨/후디',
  '긴팔',
  '스커트',
  '슈즈',
  '액세서리',
  '테니스',
  '라이프스타일',
  '클래식 셋업',
  '브라탑',
];

const sizes = ['220', '225', '230', '235', '240', '245', '250', '255', '260'];

function Products({ onProductDetail, searchQuery, onSearch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const itemsPerPage = 8;

  const productList = useMemo(
    () => {
      let baseList = Array.from({ length: 16 }, (_, index) => ({
        ...products[index % products.length],
        id: index + 1,
      }));

      if (searchQuery) {
        return baseList.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return baseList;
    },
    [searchQuery],
  );

  const pageCount = Math.ceil(productList.length / itemsPerPage);
  const visibleProducts = productList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    if (onSearch) onSearch(''); // Clear search when using filters
  };

  return (
    <section className="products_page" aria-labelledby="products-heading">
      <div className="product_list_header">
        <span className="breadcrumb">
          <button type="button">WOMEN</button>
          <span>&gt;</span>
          <button type="button">의류</button>
          <span>&gt;</span>
          <button type="button">{searchQuery ? '검색 결과' : activeFilter}</button>
        </span>

        <h1 id="products-heading">{searchQuery ? `'${searchQuery}' 검색 결과` : activeFilter}</h1>
        {!searchQuery && (
          <div className="filter_container" aria-label="Product category filters">
            <ul>
              {filters.map((filter) => (
                <li key={filter}>
                  <button
                    className="filter_text_btn"
                    type="button"
                    aria-pressed={activeFilter === filter}
                    onClick={() => handleFilter(filter)}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchQuery && (
          <div style={{ marginBottom: '32px' }}>
            <button
              onClick={() => onSearch('')}
              style={{
                padding: '8px 16px',
                border: '1px solid black',
                borderRadius: '20px',
                background: 'white',
              }}
            >
              검색 초기화
            </button>
          </div>
        )}
        <div className="button_container" role="group" aria-label="Product list tools">
          <button className="filter_btn" type="button">
            <span className="filter_icon">+</span>
            <span>필터보기</span>
          </button>
          <button className="sort_btn" type="button">
            <span>신상품순</span>
            <ArrowIcon direction="down" className="summary-arrow-icon" />
          </button>
        </div>
      </div>

      <div className="product_list" aria-live="polite">
        {productList.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', fontSize: '20px' }}>
            검색 결과가 없습니다.
          </div>
        ) : (
          <ul id="productList" aria-label="Product list">
            {visibleProducts.map((product) => (
              <li key={product.id} itemScope itemType="https://schema.org/Product">
                <button
                  type="button"
                  aria-label={`${product.name} product detail`}
                  onClick={() => onProductDetail(product)}
                >
                  <div className="image_container">
                    <div className="image_info">
                      <img
                        src={product.image}
                        className="main_img"
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                        itemProp="image"
                      />
                      <img
                        src={listHover}
                        className="hover_img"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="popup_container">
                      <span>
                        QUICK ADD <span className="quick_bag">+</span>
                      </span>
                      <ul>
                        {sizes.map((size) => (
                          <li key={size}>{size}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <img src={listThumb1} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                  <img src={listThumb2} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                  <span className="tag" itemProp="category">{product.category}</span>
                  <strong className="title" itemProp="name">{product.name}</strong>
                  <strong className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="KRW" />
                    <span itemProp="price">{product.price}</span>
                  </strong>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {productList.length > 0 && (
        <nav className="pagination" aria-label="Product pagination">
          <ArrowButton
            className="pagination_arrow"
            direction="left"
            label="Previous page"
            onClick={() => changePage(Math.max(1, currentPage - 1))}
          />
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <button
              className={currentPage === page ? 'pagination_btn active' : 'pagination_btn'}
              type="button"
              key={page}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}
          <ArrowButton
            className="pagination_arrow"
            label="Next page"
            onClick={() => changePage(Math.min(pageCount, currentPage + 1))}
          />
        </nav>
      )}
    </section>
  );
}

export default Products;
