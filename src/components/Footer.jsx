import { useState } from 'react';

const footerMenus = [
  {
    title: 'Corporate',
    links: ['About FILA', 'Athletes', 'Sustainability', 'Collaboration', 'Misto Holdings IR'],
  },
  {
    title: 'Partnership',
    links: ['단체판매', '대리점 개설문의', '입찰 참여 안내'],
  },
  {
    title: 'Support',
    links: ['공지사항', '고객센터', 'FAQ', '1:1문의', '멤버혜택'],
  },
];

const policies = ['통합회원 이용약관', '개인정보 처리방침', '제보센터'];
const socialItems = ['instagram', 'facebook', 'x', 'youtube'];

function SocialIcon({ type }) {
  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" aria-hidden="true">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 14.5zm4.8-7.8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    );
  }

  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" aria-hidden="true">
        <path d="M13 22v-9h3l1-4h-4V7c0-1.2.3-2 2-2h2V1.1C16.6 1 15.3 1 14 1c-3 0-5 1.8-5 5v3H6v4h3v9h4z" />
      </svg>
    );
  }

  if (type === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" aria-hidden="true">
        <path d="M17.2 3h3.1l-6.8 7.8 8 10.2h-6.2l-4.9-6.2L4.8 21H1.7l7.3-8.4L1.4 3h6.4l4.4 5.7L17.2 3zm-1.1 16.2h1.7L6.9 4.7H5.1l11 14.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" aria-hidden="true">
      <path d="M23 7s-.2-1.7-.8-2.5c-.8-1-1.7-1-2.1-1.1C17.5 3 12 3 12 3s-5.5 0-8.1.4c-.4 0-1.3.1-2.1 1.1C1.2 5.3 1 7 1 7s0 2 0 4v2c0 2 0 4 0 4s.2 1.7.8 2.5c.8 1 1.9 1 2.4 1.1C6.5 21 12 21 12 21s5.5 0 8.1-.4c.4 0 1.3-.1 2.1-1.1.6-.8.8-2.5.8-2.5s0-2 0-4v-2c0-2 0-4 0-4zM10 15V9l5 3-5 3z" />
    </svg>
  );
}

function Footer() {
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (title) => {
    setOpenMenus((prevMenus) =>
      prevMenus.includes(title)
        ? prevMenus.filter((menu) => menu !== title)
        : [...prevMenus, title],
    );
  };

  return (
    <footer>
      <div className="footer_container">
        <section className="site_nav">
          {footerMenus.map((menu) => {
            const isOpen = openMenus.includes(menu.title);

            return (
              <div className={isOpen ? 'is-open' : ''} key={menu.title}>
                <h4>
                  <button
                    type="button"
                    className="footer_accordion_btn"
                    aria-expanded={isOpen}
                    onClick={() => toggleMenu(menu.title)}
                  >
                    <span>{menu.title}</span>
                    <span className="footer_accordion_icon">v</span>
                  </button>
                </h4>
                <ul>
                  {menu.links.map((link) => (
                    <li key={link}>
                      <a href="#footer">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="sns_nav">
          <nav>
            <ul>
              {socialItems.map((item) => (
                <li key={item}>
                  <a href="#sns" aria-label={item}>
                    <SocialIcon type={item} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>

      <section className="info_nav">
        <div className="policy">
          <ul>
            {policies.map((policy) => (
              <li key={policy}>
                <a href="#policy">{policy}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="me_information">
          <div className="name">신가희</div>
          <div className="email">rkgml900@naver.com</div>
          <div className="text">평일 월 - 금 : 09시 - 18시 (공휴일 제외)</div>
        </div>
      </section>

      <hr />

      <div className="corporate_container">
        <section className="corp_information">
          <div>
            <div>
              <span>미스토코리아(주) 대표이사 : 김지헌</span>
              <span>서울특별시 성북구 보문로 35</span>
              <span>사업자등록번호 : 716-81-01573</span>
            </div>
            <div>
              <span>통신판매업신고 : 제 2024-서울성북-0914 호</span>
              <span>개인정보 보호책임자 : 이학우</span>
            </div>
          </div>
        </section>

        <section className="site_information">
          <div>본 사이트는 실제로 동작하는 상업 사이트가 아닌 학습용 프로젝트입니다.</div>
          <div>상품 이미지와 콘텐츠의 저작권은 각 소유자에게 있습니다.</div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
