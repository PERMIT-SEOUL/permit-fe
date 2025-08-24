import { OrderPageError } from "./_clientBoundary/OrderPageError";
import { TossPaymentWidget } from "./_clientBoundary/TossPaymentWidget";

type Props = {
  params: Promise<{ orderId: string }>;
};

/**
 * 토스 결제 페이지
 */
const OrderPage = async ({ params }: Props) => {
  const { orderId } = await params;

  return (
    <OrderPageError>
      {/* Toss 위젯이 붙을 영역 */}
      <TossPaymentWidget orderId={orderId} />
    </OrderPageError>
  );
};

export default OrderPage;
