const BINGO_CARD_SIDE_LENGTH: number = 5;
const FREE_BOX_POSITION: number = 2;

export type BingoBox = {
  isChecked: boolean;
  value: number | "FREE";
};
export type BingoColumn = BingoBox[];
export type BingoCard = BingoColumn[];
export type Range = {
  min: number;
  max: number;
};
type Rules = {
  range: Range;
  freeBoxPosition: number | null;
};
export enum ColumnTypes {
  B = "B",
  I = "I",
  N = "N",
  G = "G",
  O = "O",
}
type ColumnTypeRules = {
  [key in keyof typeof ColumnTypes]: Rules;
};

const columnRules: ColumnTypeRules = {
  B: {
    range: {
      min: 1,
      max: 15,
    },
    freeBoxPosition: null,
  },
  I: {
    range: {
      min: 16,
      max: 30,
    },
    freeBoxPosition: null,
  },
  N: {
    range: {
      min: 31,
      max: 45,
    },
    freeBoxPosition: FREE_BOX_POSITION,
  },
  G: {
    range: {
      min: 46,
      max: 60,
    },
    freeBoxPosition: null,
  },
  O: {
    range: {
      min: 61,
      max: 75,
    },
    freeBoxPosition: null,
  },
};

export const generateRandomNumberInsideRange = ({
  min,
  max,
}: Range): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateBingoColumn = (columnType: ColumnTypes): BingoColumn => {
  const { range, freeBoxPosition } = columnRules[columnType];

  const columnNumbers = generateRandomArrayOfNumbersInRangeWithNoRepeats(range);

  const column: BingoColumn = columnNumbers.map((columnNumber) => ({
    value: columnNumber,
    isChecked: false,
  }));

  if (freeBoxPosition !== null) {
    column[freeBoxPosition] = {
      value: "FREE",
      isChecked: true,
    };
  }

  return column;
};

const generateRandomArrayOfNumbersInRangeWithNoRepeats = (
  range: Range
): number[] => {
  return [...new Array(BINGO_CARD_SIDE_LENGTH)].reduce<number[]>(
    (numbersArray) => {
      let newNumber = generateRandomNumberInsideRange(range);

      while (numbersArray.includes(newNumber)) {
        newNumber = generateRandomNumberInsideRange(range);
      }

      return numbersArray.concat(newNumber);
    },
    []
  );
};

export const generateBingoCard = (): BingoCard => {
  return Object.values(ColumnTypes).map((key) => generateBingoColumn(key));
};

export const updateBingoColumn = (
  column: BingoColumn,
  drawnNumber: number
): BingoColumn => {
  return column.map((bingoBox) => {
    if (bingoBox.value === drawnNumber) {
      return { ...bingoBox, isChecked: true };
    }

    return bingoBox;
  });
};

export const updateBingoCard = (
  oldBingoCard: BingoCard,
  drawnNumber: number
): BingoCard => {
  return oldBingoCard.map((bingoColum) =>
    updateBingoColumn(bingoColum, drawnNumber)
  );
};

export const checkIfBINGO = (bingoCard: BingoCard): boolean => {
  let isBingo = false;
  const bingoColumnsRowsAndDiagonals: BingoBox[][] = [
    ...bingoCard,
    ...getBingoCardDiagonals(bingoCard),
    ...getBingoCardRows(bingoCard),
  ];

  for (const bingoBoxes of bingoColumnsRowsAndDiagonals) {
    if (verifyIfAllBingoBoxesAreChecked(bingoBoxes)) {
      isBingo = true;
      break;
    }
  }

  return isBingo;
};

export const verifyIfAllBingoBoxesAreChecked = (
  bingoBoxes: BingoBox[]
): boolean => {
  const filteredBoxes = bingoBoxes.filter((box) => box.isChecked);

  return filteredBoxes.length === bingoBoxes.length;
};

export const getBingoCardRows = (card: BingoCard): BingoBox[][] => {
  return card.reduce<BingoBox[][]>(
    (bingoCardArrows, column) =>
      column.map((_, index) =>
        (bingoCardArrows[index] ?? []).concat(column[index])
      ),
    []
  );
};

export const getBingoCardDiagonals = (card: BingoCard): BingoBox[][] => {
  const principalDiagonal: BingoBox[] = [];
  const secondaryDiagonal: BingoBox[] = [];

  for (let i = 0; i < BINGO_CARD_SIDE_LENGTH; i++) {
    for (let j = 0; j < BINGO_CARD_SIDE_LENGTH; j++) {
      if (i === j) {
        principalDiagonal.push(card[i][j]);
      }

      if (i + j === BINGO_CARD_SIDE_LENGTH - 1) {
        secondaryDiagonal.push(card[i][j]);
      }
    }
  }

  return [principalDiagonal, secondaryDiagonal];
};
