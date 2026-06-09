import styled from '@emotion/styled';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <CheckboxWrapper onClick={() => onChange(!checked)}>
      <CheckboxContainer checked={checked}>
        <CheckIcon
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.59 10.58L1.42 6.41L0 7.82L5.59 13.41L17.59 1.41L16.18 0L5.59 10.58Z"
            fill={checked ? 'white' : 'black'}
            fillOpacity={checked ? 1 : 0.1}
          />
        </CheckIcon>
      </CheckboxContainer>
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </CheckboxWrapper>
  );
}

export default Checkbox;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

const CheckboxContainer = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ checked }) => (checked ? '#000000' : '#ffffff')};
  border: ${({ checked }) => (checked ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 150ms ease;
`;

const CheckIcon = styled.svg`
  display: block;
`;

const CheckboxLabel = styled.span`
  font-family: Noto Sans;
  font-weight: 500;
  font-style: Display Medium;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0%;
  vertical-align: middle;
`;
