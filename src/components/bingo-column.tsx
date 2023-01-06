import React from "react";
import styled from "@emotion/styled";
import { BingoColumn } from "../util";
import { BingoCardBox } from "./bingo-box";

const Column = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export interface BingoCardColumnProps {
  column: BingoColumn;
}

export const BingoCardColumn: React.FC<BingoCardColumnProps> = ({ column }) => (
  <Column>
    {column.map((box) => (
      <BingoCardBox box={box} key={`box-${box.value}`} />
    ))}
  </Column>
);
