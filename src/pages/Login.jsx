import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';

function Login({ onNavigate }) {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLoginView ? '로그인되었습니다.' : '회원가입이 완료되었습니다.');
    onNavigate('home');
  };

  return (
    <section className="login-page content-section">
      <SectionTitle
        eyebrow="Member"
        title={isLoginView ? '로그인' : '회원가입'}
        description={isLoginView ? 'FILA 통합회원 계정으로 로그인해주세요.' : 'FILA의 새로운 회원이 되어 다양한 혜택을 누려보세요.'}
      />

      <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="review-form" style={{ display: 'grid', gap: '20px' }}>
          <label>
            아이디(이메일)
            <input type="email" placeholder="email@example.com" required />
          </label>
          <label>
            비밀번호
            <input type="password" placeholder="비밀번호를 입력하세요" required />
          </label>
          {!isLoginView && (
            <label>
              비밀번호 확인
              <input type="password" placeholder="비밀번호를 다시 입력하세요" required />
            </label>
          )}
          <button type="submit" className="primary-button" style={{ width: '100%', padding: '15px' }}>
            {isLoginView ? '로그인' : '회원가입'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={toggleView}
            style={{ border: '0', background: 'transparent', textDecoration: 'underline', color: 'var(--color-muted)' }}
          >
            {isLoginView ? '아직 회원이 아니신가요? 회원가입' : '이미 회원이신가요? 로그인'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
