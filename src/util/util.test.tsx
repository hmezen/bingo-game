import {
  BingoBox,
  BingoCard,
  BingoColumn,
  verifyIfAllBingoBoxesAreChecked,
  getBingoCardDiagonals,
  getBingoCardRows,
  updateBingoColumn,
} from "./index";

describe("Util test suite", () => {
  const bingoCard5x5: BingoCard = [
    [
      { value: 5, isChecked: false },
      { value: 10, isChecked: false },
      { value: 11, isChecked: false },
      { value: 7, isChecked: false },
      { value: 9, isChecked: false },
    ],
    [
      { value: 20, isChecked: false },
      { value: 25, isChecked: false },
      { value: 19, isChecked: false },
      { value: 17, isChecked: false },
      { value: 29, isChecked: false },
    ],
    [
      { value: 31, isChecked: false },
      { value: 33, isChecked: false },
      { value: 41, isChecked: false },
      { value: 40, isChecked: false },
      { value: 45, isChecked: false },
    ],
    [
      { value: 46, isChecked: false },
      { value: 51, isChecked: false },
      { value: 50, isChecked: false },
      { value: 47, isChecked: false },
      { value: 60, isChecked: false },
    ],
    [
      { value: 61, isChecked: false },
      { value: 70, isChecked: false },
      { value: 69, isChecked: false },
      { value: 66, isChecked: false },
      { value: 75, isChecked: false },
    ],
  ];

  describe("getBingoCardDiagonals", () => {
    it("should return diagonals for bingo card correctly", () => {
      expect(getBingoCardDiagonals(bingoCard5x5)).toEqual([
        [
          { value: 5, isChecked: false },
          { value: 25, isChecked: false },
          { value: 41, isChecked: false },
          { value: 47, isChecked: false },
          { value: 75, isChecked: false },
        ],
        [
          { value: 9, isChecked: false },
          { value: 17, isChecked: false },
          { value: 41, isChecked: false },
          { value: 51, isChecked: false },
          { value: 61, isChecked: false },
        ],
      ]);
    });
  });

  describe("getBingoCardRows", () => {
    it("should return transposed bingo card correctly", () => {
      expect(getBingoCardRows(bingoCard5x5)).toEqual([
        [
          { value: 5, isChecked: false },
          { value: 20, isChecked: false },
          { value: 31, isChecked: false },
          { value: 46, isChecked: false },
          { value: 61, isChecked: false },
        ],
        [
          { value: 10, isChecked: false },
          { value: 25, isChecked: false },
          { value: 33, isChecked: false },
          { value: 51, isChecked: false },
          { value: 70, isChecked: false },
        ],
        [
          { value: 11, isChecked: false },
          { value: 19, isChecked: false },
          { value: 41, isChecked: false },
          { value: 50, isChecked: false },
          { value: 69, isChecked: false },
        ],
        [
          { value: 7, isChecked: false },
          { value: 17, isChecked: false },
          { value: 40, isChecked: false },
          { value: 47, isChecked: false },
          { value: 66, isChecked: false },
        ],
        [
          { value: 9, isChecked: false },
          { value: 29, isChecked: false },
          { value: 45, isChecked: false },
          { value: 60, isChecked: false },
          { value: 75, isChecked: false },
        ],
      ]);
    });
  });

  describe("updateBingoColumn", () => {
    it("should return updated bingo column correctly given drawn number", () => {
      const bingoColumn: BingoColumn = [
        { value: 5, isChecked: false },
        { value: 25, isChecked: false },
        { value: 41, isChecked: false },
        { value: 47, isChecked: false },
        { value: 75, isChecked: false },
      ];

      expect(updateBingoColumn(bingoColumn, 25)).toEqual([
        { value: 5, isChecked: false },
        { value: 25, isChecked: true },
        { value: 41, isChecked: false },
        { value: 47, isChecked: false },
        { value: 75, isChecked: false },
      ]);
      expect(updateBingoColumn(bingoColumn, 5)).toEqual([
        { value: 5, isChecked: true },
        { value: 25, isChecked: false },
        { value: 41, isChecked: false },
        { value: 47, isChecked: false },
        { value: 75, isChecked: false },
      ]);
      expect(updateBingoColumn(bingoColumn, 50)).toEqual([
        { value: 5, isChecked: false },
        { value: 25, isChecked: false },
        { value: 41, isChecked: false },
        { value: 47, isChecked: false },
        { value: 75, isChecked: false },
      ]);
    });
  });

  describe("verifyIfAllBingoBoxesAreChecked", () => {
    it("should return true if all boxes are checked", () => {
      const bingoBoxes: BingoBox[] = [
        { value: 9, isChecked: true },
        { value: 17, isChecked: true },
        { value: 41, isChecked: true },
        { value: 51, isChecked: true },
        { value: 61, isChecked: true },
      ];

      expect(verifyIfAllBingoBoxesAreChecked(bingoBoxes)).toEqual(true);
    });

    it("should return false if one of boxes is not checked", () => {
      const bingoBoxes: BingoBox[] = [
        { value: 9, isChecked: false },
        { value: 17, isChecked: true },
        { value: 41, isChecked: true },
        { value: 51, isChecked: true },
        { value: 61, isChecked: true },
      ];

      expect(verifyIfAllBingoBoxesAreChecked(bingoBoxes)).toEqual(false);
    });

    it("should return false if multiple boxes are not checked", () => {
      const bingoBoxes: BingoBox[] = [
        { value: 9, isChecked: false },
        { value: 17, isChecked: true },
        { value: 41, isChecked: true },
        { value: 51, isChecked: false },
        { value: 61, isChecked: true },
      ];

      expect(verifyIfAllBingoBoxesAreChecked(bingoBoxes)).toEqual(false);
    });

    it("should return false if all boxes are not checked", () => {
      const bingoBoxes: BingoBox[] = [
        { value: 9, isChecked: false },
        { value: 17, isChecked: false },
        { value: 41, isChecked: false },
        { value: 51, isChecked: false },
        { value: 61, isChecked: false },
      ];

      expect(verifyIfAllBingoBoxesAreChecked(bingoBoxes)).toEqual(false);
    });
  });
});
