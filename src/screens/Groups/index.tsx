import { useEffect, useState, useCallback } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container, TextStyled } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupGetAll } from "@storage/group/groupGetAll";
import { AppError } from "@utils/AppError";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const groups = await groupGetAll();
      setGroups(groups);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Erro ao listar grupos");

        console.log(error);
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log("fetching groups useFocusEffect");
      fetchGroups();
    }, [])
  );

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
      <Button title="Criar nova turma!" onPress={handleNewGroup} />
    </Container>
  );
}
