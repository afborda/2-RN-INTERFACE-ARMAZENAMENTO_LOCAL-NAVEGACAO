import { useState } from "react";

import { FlatList, Text, View } from "react-native";
import { Container, TextStyled } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header />
      <Highlight title="Grupos" subtitle="Escolha um grupo para começar" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flexGrow: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Borá cadastrar uma nova turma?" />
        }
      />
      <Button title="Criar nova turma!" />
    </Container>
  );
}
