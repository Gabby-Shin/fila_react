import store1911Myeongdong from '../assets/images/store-1911-myeongdong.png';
import storeBusanGwangbok from '../assets/images/store-busan-gwangbok.png';
import storeStarfieldSuwon from '../assets/images/store-starfield-suwon.png';

const stores = [
  {
    id: 'myeongdong',
    name: 'FILA 1911 명동',
    address: '서울특별시 중구 명동2가 33-7',
    phone: '02-774-3748',
    image: store1911Myeongdong,
  },
  {
    id: 'busan-gwangbok',
    name: 'FILA 부산 광복',
    address: '부산광역시 중구 광복로 76-2',
    phone: '051-231-2737',
    image: storeBusanGwangbok,
  },
  {
    id: 'starfield-suwon',
    name: 'FILA 스타필드 수원',
    address: '경기 수원시 장안구 수성로 175 스타필드수원 5층 휠라',
    phone: '031-690-1504',
    image: storeStarfieldSuwon,
  },
];

function StorePinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

function StoreGuide() {
  return (
    <section className="store-guide-page">
      <h1>매장안내</h1>

      <div className="store-card-grid">
        {stores.map((store) => (
          <article className="store-card" key={store.id}>
            <img src={store.image} alt={`${store.name} 매장`} />
            <div className="store-card-info">
              <div>
                <h2>{store.name}</h2>
                <p>{store.address}</p>
                <a href={`tel:${store.phone}`}>{store.phone}</a>
              </div>
              <StorePinIcon />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StoreGuide;
