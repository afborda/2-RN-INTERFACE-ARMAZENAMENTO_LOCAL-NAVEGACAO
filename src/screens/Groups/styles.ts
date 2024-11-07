import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  padding: 0 20px;
`;

export const TextStyled = styled.Text`
  font-size: 24px;
  color: red;
`;
