import styled from '@emotion/styled';

function OrderSummary() {
  return (
    <SummaryContainer>
      <DescriptionRow>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3.33333H7.33333V4.66667H6V3.33333ZM6 6H7.33333V10H6V6ZM6.66667 0C2.98667 0 0 2.98667 0 6.66667C0 10.3467 2.98667 13.3333 6.66667 13.3333C10.3467 13.3333 13.3333 10.3467 13.3333 6.66667C13.3333 2.98667 10.3467 0 6.66667 0ZM6.66667 12C3.72667 12 1.33333 9.60667 1.33333 6.66667C1.33333 3.72667 3.72667 1.33333 6.66667 1.33333C9.60667 1.33333 12 3.72667 12 6.66667C12 9.60667 9.60667 12 6.66667 12Z"
            fill="black"
          />
        </svg>
        <p id="summary-description">총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </DescriptionRow>
      <SummaryWrapper>
        <div id="summary-row">
          <h2>주문 금액</h2>
          <p>70,000원</p>
        </div>
        <div id="summary-row">
          <h2>배송비</h2>
          <p>3,000원</p>
        </div>
      </SummaryWrapper>
      <SummaryWrapper>
        <div id="summary-row">
          <h2>총 결제 금액</h2>
          <p>73,000원</p>
        </div>
      </SummaryWrapper>
    </SummaryContainer>
  );
}

export default OrderSummary;

const SummaryContainer = styled.div`
  padding: 0 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
`;

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  #summary-description {
    font-family: Noto Sans;
    font-weight: 500;
    font-style: Display Medium;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0%;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #0000001a;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.75rem;
  gap: 0.5rem;

  #summary-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    h2 {
      font-family: Noto Sans;
      font-weight: 700;
      font-style: Bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0%;
      vertical-align: middle;
    }

    p {
      font-family: Noto Sans KR;
      font-weight: 700;
      font-style: Bold;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: right;
      vertical-align: middle;
    }
  }
`;
