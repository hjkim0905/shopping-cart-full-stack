import styled from '@emotion/styled';

function Cart() {
  return (
    <PageContainer>
      <Banner>
        <h1 id="banner-logo">SHOP</h1>
      </Banner>
    </PageContainer>
  );
}

export default Cart;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  background-color: #000000;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;

  #banner-logo {
    font-family: Noto Sans;
    font-weight: 800;
    font-style: ExtraBold;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #ffffff;
  }
`;
