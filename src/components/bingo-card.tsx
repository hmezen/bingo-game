import { useState, FC } from "react";
import styled from "@emotion/styled";
import {
  generateBingoCard,
  BingoCard,
  ColumnTypes,
  generateRandomNumberInsideRange,
  updateBingoCard,
  checkIfBINGO,
  Range,
} from "../util";
import { BingoCardColumn } from "./bingo-column";

const Card = styled.div`
  width: 500px;
  height: auto;
  background-color: #446444;
  border-radius: 10px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ColumnKey = styled.div`
  width: 100px;
  text-align: center;
`;

const Span = styled.span`
  font-size: 42px;
  color: #fff;
  font-weight: bold;
`;

const ButtonsContainer = styled.div`
  background-color: #e6efea;
  width: 460px;
  border-radius: 15px;
  border: 3px solid #446444;
  padding: 25px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  border-radius: 15px;
  background-color: "#446444";
  border: 1px solid black;
  color: "white";
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Number = styled.div`
  font-size: 50px;
`;

const Body = Header;

export const BingoCardMatrix: FC = () => {
  const [bingoCard, setBingoCard] = useState<BingoCard>(generateBingoCard());
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);
  const [isBingo, setIsBingo] = useState<boolean>(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  const updateBingoCardGivenNewNumber = (newNumber: number) => {
    const updatedBingoCard = updateBingoCard(bingoCard, newNumber);

    if (checkIfBINGO(updatedBingoCard)) {
      setIsBingo(true);
    }

    setBingoCard(updatedBingoCard);
  };

  const handleDrawNewNumber = () => {
    const range: Range = { min: 1, max: 75 };
    let newNumber = generateRandomNumberInsideRange(range);

    if (drawnNumbers.length !== 75) {
      while (drawnNumbers.includes(newNumber)) {
        newNumber = generateRandomNumberInsideRange(range);
      }

      setDrawnNumbers(drawnNumbers.concat(newNumber));
    }

    setDrawnNumber(newNumber);
    updateBingoCardGivenNewNumber(newNumber);
  };

  const handleRestart = () => {
    setBingoCard(generateBingoCard());
    setIsBingo(false);
    setDrawnNumber(null);
    setDrawnNumbers([]);
  };

  return (
    <>
      <Card>
        <Header>
          {Object.keys(ColumnTypes).map((value) => (
            <ColumnKey key={value}>
              <Span>{value}</Span>
            </ColumnKey>
          ))}
        </Header>

        <Body>
          {bingoCard.map((column, index) => (
            <BingoCardColumn
              column={column}
              key={`column-${column[0].value}`}
            />
          ))}
        </Body>
      </Card>

      <ButtonsContainer>
        {!isBingo && (
          <>
            <Button onClick={handleDrawNewNumber}>Draw new number</Button>
            {drawnNumber !== null && <Number>{drawnNumber}</Number>}
          </>
        )}

        {isBingo && (
          <>
            <div>BINGO!!</div>
            <div>{`You did it in ${drawnNumbers.length} steps`}</div>
            <Button onClick={handleRestart}>Restart</Button>
          </>
        )}
      </ButtonsContainer>
    </>
  );
};
