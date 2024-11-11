import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styled";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { PlaerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/players/PlayerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export default function Players() {
  const [team, setTeam] = useState("");
  const [players, setPlayers] = useState<PlaerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    console.log("Adicionando jogador");

    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa!",
        "Informe o nome da pessoa para adicionar"
      );
    }
    const newPlayer = {
      name: newPlayerName,
      team
    };
    try {
      await playerAddByGroup(newPlayer, group);
      setNewPlayerName("");

      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Erro ao adicionar pessoa");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const players = await playerGetByGroupAndTeam(group, team);
      setPlayers(players);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Pessoas", error.message);
      } else {
        console.log(error);
        Alert.alert("Pessoas", "Não foi possível listar as pessoas");
      }
    }
  }

  async function handleRemobePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover pessoa", "Erro ao remover pessoa");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover Grupo", "Erro ao remover Grupo");
    }
  }

  async function handleRemoveGroup() {
    try {
      Alert.alert("Remover", "Deseja realmente remover o grupo?", [
        {
          text: "Sim",
          onPress: () => groupRemove()
        },
        {
          text: "Não",
          style: "cancel"
        }
      ]);
    } catch (error) {
      Alert.alert("Remover turma", "Erro ao remover turma");
    }
  }

  useEffect(() => {
    console.log("fetching players useEffect");

    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times para jogar"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Digite o nome do jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time 1", "Time 2"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>{players.length} Jogadores</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemobePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não a pessoas nesse time!" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: 100
          },

          players.length === 0 && { flex: 1 }
        ]}
      />
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
