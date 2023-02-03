import { render, screen } from "@testing-library/react";
import { BingoCardMatrix } from "./bingo-card-matrix";
import * as util from "../util";
import userEvent from "@testing-library/user-event";

const bingoCard5x5: util.BingoCard = [
  [
    { value: 15, isChecked: false },
    { value: 10, isChecked: true },
    { value: 11, isChecked: true },
    { value: 7, isChecked: true },
    { value: 9, isChecked: true },
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

const newDrawnNoBINGONumber = 16;

jest.mock("./bingo-card-column", () => ({
  BingoCardColumn: () => {
    return <div data-testid="column" />;
  },
}));

describe("BingoCardMatrix", () => {
  const setup = () => {
    return render(<BingoCardMatrix />);
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should trigger `generateBingoCard` only one time in first render", () => {
    jest.spyOn(util, "generateBingoCard");

    setup();

    expect(util.generateBingoCard).toHaveBeenCalledTimes(1);
  });

  it("should render one bingo column if generateBingoCard only return one column", () => {
    jest.spyOn(util, "generateBingoCard").mockReturnValue([bingoCard5x5[0]]);

    setup();

    expect(screen.getAllByTestId("column")).toHaveLength(1);
  });

  it("should render five bingo columns if generateBingoCard returns five column", () => {
    setup();

    expect(screen.getAllByTestId("column")).toHaveLength(5);
  });

  it("should show `draw new number` button if no BINGO", () => {
    setup();

    expect(
      screen.getByRole("button", { name: "Draw new number" })
    ).toBeVisible();
  });

  it("should not show `restart` button and `Congrats message` if no BINGO", () => {
    setup();

    expect(
      screen.queryByRole("button", { name: "Restart" })
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Congrats BINGO!!")).not.toBeInTheDocument();
  });

  it("should show new drawn number when user clicks on the button", () => {
    jest
      .spyOn(util, "generateRandomNumberInsideRange")
      .mockReturnValue(newDrawnNoBINGONumber);

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(screen.getByText(newDrawnNoBINGONumber)).toBeVisible();
    expect(util.generateRandomNumberInsideRange).toHaveBeenCalledTimes(1);
  });

  it("should trigger `updateBingoCard` when user draws new number", () => {
    jest.spyOn(util, "generateBingoCard").mockReturnValue(bingoCard5x5);
    jest.spyOn(util, "updateBingoCard");
    jest
      .spyOn(util, "generateRandomNumberInsideRange")
      .mockReturnValue(newDrawnNoBINGONumber);

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(util.updateBingoCard).toHaveBeenCalledTimes(1);
    expect(util.updateBingoCard).toHaveBeenLastCalledWith(
      bingoCard5x5,
      newDrawnNoBINGONumber
    );
  });

  it("should trigger `checkIfBINGO` when user draws new number", () => {
    jest.spyOn(util, "checkIfBINGO");

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(util.checkIfBINGO).toHaveBeenCalledTimes(1);
  });

  it("should show `congrats` message if BINGO", () => {
    jest.spyOn(util, "checkIfBINGO").mockReturnValue(true);

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(screen.getByText("BINGO!!")).toBeVisible();
  });

  it("should show restart button if BINGO", () => {
    jest.spyOn(util, "checkIfBINGO").mockReturnValue(true);

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(
      screen.getByRole("button", {
        name: "Restart",
      })
    ).toBeVisible();
  });

  it("should hide draw new number button if BINGO", () => {
    jest.spyOn(util, "checkIfBINGO").mockReturnValue(true);

    setup();

    const buttonElement = screen.getByRole("button", {
      name: "Draw new number",
    });

    userEvent.click(buttonElement);

    expect(buttonElement).not.toBeVisible();
  });
});
