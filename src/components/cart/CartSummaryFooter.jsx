import CartButton from './CartButton.jsx';

function SummaryLine({ label, value }) {
  return (
    <div className="cart-summary-footer__line">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function CartSummaryFooter({
  deliveryFee,
  formatPrice,
  onCheckout,
  orderTotal,
  productTotal,
  selectedCount,
  vat,
}) {
  const remainingForFreeDelivery = Math.max(0, 50000 - productTotal);

  return (
    <section className="cart-summary-footer" aria-label="주문 요약">
      <div className="cart-summary-footer__grid">
        <SummaryLine label="상품 합계" value={formatPrice(productTotal)} />
        <SummaryLine label="배송비" value={formatPrice(deliveryFee)} />
        <SummaryLine label="VAT" value={formatPrice(vat)} />
        <SummaryLine label="총 결제금액" value={formatPrice(orderTotal)} />
      </div>
      <div className="cart-summary-footer__bottom">
        <p>
          {selectedCount === 0
            ? '주문할 상품을 선택해 주세요.'
            : remainingForFreeDelivery > 0
              ? `${remainingForFreeDelivery.toLocaleString('ko-KR')}원 추가 구매 시 무료배송`
              : '무료배송 적용'}
        </p>
        <CartButton disabled={selectedCount === 0} onClick={onCheckout} variant="primary">
          주문하기
        </CartButton>
      </div>
    </section>
  );
}

export default CartSummaryFooter;
