import React from "react";
import { render, screen } from "@testing-library/react";
import { BingoCardColumn, BingoCardColumnProps } from "./bingo-column";

jest.mock("./bingo-box", () => ({
  BingoCardBox: () => {
    return <div data-testid="box" />;
  },
}));

describe("BingoCardColumn unit test suite", () => {
  const props: BingoCardColumnProps = {
    column: [
      {
        value: 5,
        isChecked: true,
      },
    ],
  };

  const setup = (props: BingoCardColumnProps) => {
    return render(<BingoCardColumn {...props} />);
  };

  it("should render two boxes if column length is 1", () => {
    setup(props);

    expect(screen.getAllByTestId("box")).toHaveLength(1);
  });

  it("should render two boxes if column length is 2", () => {
    setup({ column: [...props.column, { value: 3, isChecked: false }] });

    expect(screen.getAllByTestId("box")).toHaveLength(2);
  });

  it("should render no boxes if column length is 0", () => {
    setup({
      column: [],
    });

    expect(screen.queryAllByTestId("box")).toHaveLength(0);
  });
});
