import { useEffect } from 'react';

const pageMeta = {
  home: {
    title: 'FILA | Trending Products & Heritage Collection',
    description:
      'FILA 공식 스타일을 기반으로 한 반응형 React 쇼핑몰입니다. 트렌딩 상품과 헤리티지 컬렉션을 확인하세요.',
  },
  products: {
    title: 'FILA Products | 신상품과 트렌딩 상품',
    description: 'FILA 의류, 슈즈, 액세서리 상품 목록을 모바일과 데스크탑에서 편하게 탐색하세요.',
  },
  detail: {
    title: 'FILA Product Detail | 상품 상세',
    description: 'FILA 상품 이미지, 옵션, 리뷰와 상세 정보를 확인하고 장바구니에 담아보세요.',
  },
  reviews: {
    title: 'FILA Reviews | 상품 리뷰 게시판',
    description: 'FILA 상품 리뷰를 작성하고 수정, 삭제할 수 있는 리뷰 게시판입니다.',
  },
  cart: {
    title: 'FILA Cart | 장바구니',
    description: '선택한 FILA 상품의 수량, 옵션, 주문 금액을 장바구니에서 확인하세요.',
  },
  login: {
    title: 'FILA Login | 회원 로그인',
    description: 'FILA 회원 로그인과 회원가입을 진행할 수 있는 페이지입니다.',
  },
  store: {
    title: 'FILA Store Guide | 매장 안내',
    description: 'FILA 오프라인 매장 위치와 연락처를 확인하세요.',
  },
};

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

function Seo({ currentPage, selectedProduct }) {
  useEffect(() => {
    const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;
    const meta = pageMeta[currentPage] || pageMeta.home;
    const title = currentPage === 'detail' && selectedProduct
      ? `${selectedProduct.name} | FILA`
      : meta.title;
    const description = currentPage === 'detail' && selectedProduct
      ? `${selectedProduct.name} 상품 상세, 가격, 이미지와 리뷰 정보를 확인하세요.`
      : meta.description;
    const imageUrl = `${baseUrl}favicon.png`;

    document.documentElement.setAttribute('lang', 'ko');
    document.documentElement.setAttribute('dir', 'ltr');
    document.title = title;

    setLink('canonical', baseUrl);
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });
    setMeta('meta[name="application-name"]', { name: 'application-name', content: 'FILA' });
    setMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#002f6c' });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ko_KR' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'FILA' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: baseUrl });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'FILA logo' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FILA',
      url: baseUrl,
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
    let structuredDataScript = document.head.querySelector('#fila-structured-data');

    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'fila-structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.textContent = JSON.stringify(structuredData);
  }, [currentPage, selectedProduct]);

  return null;
}

export default Seo;
