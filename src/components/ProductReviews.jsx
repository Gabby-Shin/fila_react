import { ArrowIcon } from './ArrowButton.jsx';
import userImage from '../assets/images/review-user.jpg';
import photo1 from '../assets/images/review-photo-1.webp';
import photo2 from '../assets/images/review-photo-2.webp';
import photo3 from '../assets/images/review-photo-3.webp';
import photo4 from '../assets/images/review-photo-4.webp';
import photo5 from '../assets/images/review-photo-5.webp';
import photo6 from '../assets/images/review-photo-6.webp';
import photo7 from '../assets/images/review-photo-7.webp';
import photo8 from '../assets/images/review-photo-8.webp';

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" aria-hidden="true">
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 14.5zm4.8-7.8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
  );
}

const reviews = [
  {
    name: '짱구짱',
    option: 'BLACK / S',
    date: '2026.06.01',
    text: '원단이 가볍고 움직일 때 편해서 모델컷 그대로 핏이 살아납니다.',
    images: [photo1, photo2],
  },
  {
    name: '철수',
    option: 'WHITE / M',
    date: '2026.05.28',
    text: '디자인이 깔끔하고 데일리로 입기 좋아요. 사이즈도 정사이즈로 잘 맞았습니다.',
    images: [photo3, photo4],
  },
  {
    name: '유리',
    option: 'BLACK / M',
    date: '2026.05.20',
    text: '테니스 칠 때 입으려고 구매했는데 활동성이 좋아서 자주 입고 있습니다.',
    images: [photo5],
  },
  {
    name: '맹구',
    option: 'WHITE / S',
    date: '2026.05.12',
    text: '사진보다 실물이 더 예쁘고 소재가 부드러워 여름에도 부담이 없습니다.',
    images: [photo6, photo7],
  },
];

function ProductReviews({ onNavigate }) {
  return (
    <section id="review">
      <h2>REVIEW</h2>
      <button type="button" onClick={() => onNavigate('reviews')}>
        리뷰 작성하기
      </button>

      <section className="rating">
        <div className="average_rating">
          <h3>
            <span className="star">★</span>
            <span>3.5</span>
          </h3>
          <span>
            50%가 <b>마음에 들어요</b> 라고 평가했습니다.
          </span>
          <span>리뷰 32개</span>
        </div>

        <div className="total_rating">
          {['아주 좋아요', '마음에 들어요', '보통이에요', '그냥 그래요', '별로예요'].map((label, index) => (
            <div key={label}>
              <span className="title">{label}</span>
              <div className="stars">
                {'★'.repeat(5 - index)}
                {'☆'.repeat(index)}
              </div>
              <span className="count">{[10, 16, 6, 4, 0][index]}</span>
            </div>
          ))}
        </div>
      </section>

      <hr />

      <section className="photo_video">
        <div className="header">
          <h3>포토&동영상</h3>
          <button type="button">
            <span>전체보기</span>
            <ArrowIcon />
          </button>
        </div>
        <ul>
          {photos.map((photo, index) => (
            <li className="button image_container" key={photo}>
              <img src={photo} alt={`리뷰 포토 ${index + 1}`} />
              <span aria-hidden="true">
                <InstagramIcon />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <section className="filter">
        <div>
          <div className="sort_container">
            <button type="button">최신순</button>
            <button type="button">AI 추천순</button>
            <button type="button">별점순</button>
          </div>
          <div className="search_container">
            <button type="button">포토/동영상 먼저 보기</button>
            <label className="search">
              <span>검색</span>
              <input type="search" placeholder="리뷰 키워드 검색" />
            </label>
          </div>
        </div>
        <hr />
      </section>

      <section className="whole_reviews">
        <section className="reviews">
          <ul>
            {reviews.map((review) => (
              <li className="item" key={`${review.name}-${review.date}`}>
                <div className="contents">
                  <div className="user">
                    <span className="user_icon">
                      <img src={userImage} alt={review.name} />
                    </span>
                    <span className="user_info">
                      <span className="user_name">{review.name}</span>
                      <span className="user_stars" aria-label="별점 5점">★★★★★</span>
                    </span>
                  </div>

                  <div className="options">
                    <span>{review.option}</span>
                    <span>{review.date}</span>
                  </div>

                  <p>{review.text}</p>

                  <div className="images">
                    {review.images.map((image, index) => (
                      <button className="image_button" type="button" key={image}>
                        <img src={image} alt={`${review.name} 리뷰 이미지 ${index + 1}`} />
                      </button>
                    ))}
                  </div>

                  <div className="report">
                    <button type="button">🚫 신고 및 차단</button>
                  </div>

                  <div className="thumbs">
                    <button type="button">👍 좋아요 12</button>
                    <button type="button">💬 댓글 0</button>
                  </div>
                </div>

                <section className="reviews_2">
                  <div>
                    <strong>FILA</strong> 관리자 리뷰
                  </div>
                  <div>
                    <b>작성자 등급</b> 운영자
                  </div>
                  <div>
                    <span className="date">확인 완료</span>
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
}

export default ProductReviews;
