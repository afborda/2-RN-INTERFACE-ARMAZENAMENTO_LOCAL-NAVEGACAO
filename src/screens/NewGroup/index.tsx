import { Text } from "react-native";
import { Container, Content, Icon } from "./styled";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export default function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Criar nova turma"
          subtitle="Crie a turma para adicionar pessoas."
        />

        <Input placeholder="Nome da turma" />

        <Button title="Criar turma" />
      </Content>
    </Container>
  );
}
