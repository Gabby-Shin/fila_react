import { useState } from 'react';
import logo from '../assets/images/header-logo.png';

const navItems = [
  { id: 'products', label: 'Women', columns: ['Clothing', 'Shoes', 'Bags', 'Accessories'] },
  { id: 'products', label: 'Men', columns: ['Clothing', 'Shoes', 'Bags', 'Sports'] },
  { id: 'products', label: 'Kids', columns: ['Clothing', 'Shoes', 'School Bags', 'Accessories'] },
  { id: 'products', label: 'Tennis', columns: ['FILA Tennis', 'Skirts', 'Tennis Shoes', 'Rackets'] },
  { id: 'products', label: 'F.H.C', columns: ['Heritage', 'Collection', 'Campaign', 'Review'] },
];

const submenuLinks = ['All', 'BEST', 'New Arrivals', 'Online Exclusive', 'Sale'];

function HeaderIcon({ type }) {
  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    );
  }

  if (type === 'search') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </svg>
    );
  }

  if (type === 'account') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.4-4.3 4.3-6.4 8-6.4s6.6 2.1 8 6.4" />
      </svg>
    );
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8h10l1.2 12H5.8L7 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const iconItems = [
  { label: 'Store location', type: 'location', page: 'products' },
  { label: 'Search', type: 'search', page: 'products' },
  { label: 'Account', type: 'account', page: 'reviews' },
  { label: 'Cart', type: 'cart', page: 'cart' },
];

function Header({ currentPage, onNavigate }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('Women');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openedMenu = activeMenu ? navItems.find((item) => item.label === activeMenu) : null;

  const handleMenuClick = (item) => {
    setSelectedMenu(item.label);
    setIsMobileMenuOpen(false);
    onNavigate(item.id);
  };

  return (
    <>
      <div className="coupon_info_container coupon-info-container">
        <button type="button" onClick={() => onNavigate('reviews')}>
          FILA 카카오 플러스친구 추가 시 10% 쿠폰
        </button>
      </div>

      <header
        className={currentPage === 'home' ? 'site-header' : 'site-header dark'}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <button className="home_btn home-btn" type="button" onClick={() => onNavigate('home')}>
          <img src={logo} alt="FILA" />
        </button>

        <ul className="main_menu main-menu">
          {navItems.map((item) => (
            <li key={item.label} onMouseEnter={() => setActiveMenu(item.label)}>
              <button
                className={selectedMenu === item.label && currentPage === item.id ? 'active' : ''}
                type="button"
                onClick={() => handleMenuClick(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <nav className="header-icons" aria-label="member menu">
          {iconItems.map((item) => (
            <button
              type="button"
              aria-label={item.label}
              key={item.label}
              onClick={() => onNavigate(item.page)}
            >
              <HeaderIcon type={item.type} />
            </button>
          ))}
          <button
            className="mobile_menu_btn"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <HeaderIcon type="menu" />
          </button>
        </nav>

        {openedMenu && (
          <div className="sub-menu-container active">
            {openedMenu.columns.map((column) => (
              <div key={column}>
                <b className="sub-menu-title">
                  <button type="button" onClick={() => handleMenuClick(openedMenu)}>
                    {column}
                  </button>
                </b>
                <ul className="sub-menu">
                  <li>
                    {submenuLinks.map((link) => (
                      <button type="button" key={link} onClick={() => handleMenuClick(openedMenu)}>
                        {link}
                      </button>
                    ))}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className={isMobileMenuOpen ? 'mobile_header_menu active' : 'mobile_header_menu'}>
          {navItems.map((item) => (
            <section className="mobile_menu_group" key={item.label}>
              <button className="mobile_menu_title" type="button" onClick={() => handleMenuClick(item)}>
                {item.label}
              </button>
              <div className="mobile_menu_columns">
                {item.columns.map((column) => (
                  <div key={column}>
                    <button type="button" onClick={() => handleMenuClick(item)}>{column}</button>
                    <ul>
                      {submenuLinks.map((link) => (
                        <li key={link}>
                          <button type="button" onClick={() => handleMenuClick(item)}>{link}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </header>
    </>
  );
}

export default Header;
