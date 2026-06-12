import CartButton from './CartButton.jsx';

const deliveryTabs = [
  { id: 'standard', label: '일반배송' },
  { id: 'today', label: '오늘도착' },
  { id: 'reserve', label: '예약구매' },
  { id: 'custom', label: '커스텀 오더' },
];

function CartDeliveryTabs({ activeTab, itemCount, onChange }) {
  return (
    <div className="cart-delivery-tabs" role="tablist" aria-label="배송 유형">
      {deliveryTabs.map((tab) => (
        <CartButton
          className={activeTab === tab.id ? 'is-active' : ''}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          variant="pill"
        >
          {tab.label}
          {tab.id === 'standard' && itemCount > 0 && (
            <span className="cart-delivery-tabs__badge">{itemCount}</span>
          )}
        </CartButton>
      ))}
    </div>
  );
}

export default CartDeliveryTabs;
