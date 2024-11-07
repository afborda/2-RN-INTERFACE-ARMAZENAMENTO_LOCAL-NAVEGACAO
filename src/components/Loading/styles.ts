import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: "large",
  color: theme.COLORS.GRAY_700
}))`
  margin-top: 20px;
  margin-bottom: 20px;
`;
