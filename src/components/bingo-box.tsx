import { FC } from "react";
import styled from "@emotion/styled";
import { BingoBox } from "../util";

const Box = styled.div<{ isChecked: boolean }>`
  padding: 20px 0;
  border: 1px solid #000;
  background-color: ${(props) => (props.isChecked ? "#ADD8E6" : "#fff")};
  text-align: center;
`;

const BoxValue = styled.span`
  color: #000;
  font-size: 32px;
`;

export interface BingoCardBoxProps {
  box: BingoBox;
}

export const BingoCardBox: FC<BingoCardBoxProps> = ({ box }) => {
  const { isChecked, value } = box;

  return (
    <Box isChecked={isChecked} data-testid="number-card">
      <BoxValue>{value}</BoxValue>
    </Box>
  );
};
