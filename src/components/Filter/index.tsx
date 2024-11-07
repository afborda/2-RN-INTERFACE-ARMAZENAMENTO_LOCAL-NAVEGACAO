import { TouchableOpacityProps } from "react-native";
import { Container, Title, FilterStyleProps } from "./styled";

export type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
    isActive?: boolean;

    onPress?: () => void;
  };

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
