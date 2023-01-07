import { FC, useState } from "react";
import styled from "@emotion/styled";

import { BingoCardMatrix } from "./components/bingo-card";

const NameContainer = styled.div`
  background-color: #e6efea;
  width: 300px;
  border-radius: 15px;
  border: 3px solid #446444;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BingoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const NameForm = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button<{ disabled: boolean }>`
  border-radius: 15px;
  background-color: ${(props) => (props.disabled ? "#EFEFEF" : "#446444")};
  border: 1px solid black;
  color: ${(props) => (props.disabled ? "black" : "white")};
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Input = styled.input`
  border: 2px solid;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 20px;
`;

const WelcomeText = styled.label`
  font-size: 30px;
`;

const App: FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [canPlay, setCanPlay] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);

    if (canPlay) {
      setCanPlay(false);
    }
  };

  const isStartPlayingButtonEnabled = playerName.length > 0;

  return (
    <Page>
      <Container>
        <NameContainer>
          <NameForm>
            <Label>Name* </Label>
            <Input
              name="enter-name"
              type="text"
              value={playerName}
              onChange={handleNameChange}
            />
          </NameForm>
          <Button
            onClick={() => setCanPlay(true)}
            disabled={!isStartPlayingButtonEnabled}
          >
            Start playing!
          </Button>
        </NameContainer>

        {canPlay && (
          <BingoCardContainer data-testid="bingo-card">
            <WelcomeText>{`Welcome ${playerName}!!`}</WelcomeText>

            <BingoCardMatrix />
          </BingoCardContainer>
        )}
      </Container>
    </Page>
  );
};

export default App;
