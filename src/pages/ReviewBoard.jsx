import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';

const initialReviews = [
  {
    id: 1,
    name: '김하나',
    product: 'Classic Court Sneakers',
    rating: 5,
    content: '착화감이 편하고 로고 포인트가 깔끔해서 자주 신고 있습니다.',
  },
  {
    id: 2,
    name: '박도윤',
    product: 'Logo Graphic Tee',
    rating: 4,
    content: '핏이 여유 있고 소재가 가벼워 여름에 입기 좋습니다.',
  },
];

const emptyForm = {
  name: '',
  product: '',
  rating: '5',
  content: '',
};

function ReviewBoard() {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const isEditing = editingId !== null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.product.trim() || !form.content.trim()) {
      alert('이름, 상품명, 리뷰 내용을 모두 입력해 주세요.');
      return;
    }

    if (isEditing) {
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editingId
            ? { ...review, ...form, rating: Number(form.rating) }
            : review,
        ),
      );
      setEditingId(null);
    } else {
      const newReview = {
        id: Date.now(),
        ...form,
        rating: Number(form.rating),
      };
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    }

    setForm(emptyForm);
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setForm({
      name: review.name,
      product: review.product,
      rating: String(review.rating),
      content: review.content,
    });
  };

  const handleDelete = (id) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <section className="content-section review-page">
      <SectionTitle
        eyebrow="CRUD Board"
        title="상품 리뷰 게시판"
        description="리뷰 작성, 목록 조회, 수정, 삭제가 가능한 CRUD 페이지입니다."
      />

      <div className="review-layout">
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>{isEditing ? '리뷰 수정' : '리뷰 작성'}</h3>

          <label>
            이름
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="작성자 이름"
            />
          </label>

          <label>
            상품명
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder="구매한 상품명"
            />
          </label>

          <label>
            평점
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value="5">5점</option>
              <option value="4">4점</option>
              <option value="3">3점</option>
              <option value="2">2점</option>
              <option value="1">1점</option>
            </select>
          </label>

          <label>
            리뷰 내용
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="상품 사용 후기를 입력해 주세요."
              rows="5"
            />
          </label>

          <div className="form-actions">
            <button type="submit">{isEditing ? '수정 완료' : '등록하기'}</button>
            {isEditing && (
              <button className="secondary" type="button" onClick={handleCancel}>
                취소
              </button>
            )}
          </div>
        </form>

        <div className="review-list">
          {reviews.length === 0 ? (
            <p className="empty-message">등록된 리뷰가 없습니다.</p>
          ) : (
            reviews.map((review) => (
              <article className="review-item" key={review.id}>
                <div>
                  <span>{review.product}</span>
                  <h3>{review.name}</h3>
                  <p>{review.content}</p>
                  <strong>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </strong>
                </div>
                <div className="review-actions">
                  <button type="button" onClick={() => handleEdit(review)}>
                    수정
                  </button>
                  <button type="button" onClick={() => handleDelete(review.id)}>
                    삭제
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ReviewBoard;
