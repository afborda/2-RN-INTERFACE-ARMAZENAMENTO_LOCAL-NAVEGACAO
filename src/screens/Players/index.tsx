import { Header } from "@components/Header";
import { Input } from "@components/Input";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styled";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export default function Players() {
  const [team, setTeam] = useState("Time 1");
  const [players, setPlayers] = useState(["Abner", "Ana", "Bruno", "Carlos"]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Jogadores"
        subtitle="Adicione a galera e separe os times para jogar"
      />
      <Form>
        <Input placeholder="Digite o nome do jogador" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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
      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}
