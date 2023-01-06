import React from "react";
import { render, screen } from "@testing-library/react";
import { BingoCardBox, BingoCardBoxProps } from "./bingo-box";

describe("BingoCardBox unit test suite", () => {
  const props: BingoCardBoxProps = {
    box: { isChecked: false, value: 15 },
  };

  const setup = (props: BingoCardBoxProps) => {
    return render(<BingoCardBox {...props} />);
  };

  it("should render the style correctly if the box is not checked", () => {
    setup(props);

    expect(screen.getByTestId("number-card")).toHaveStyle(
      "background-color : rgb(255, 255, 255)"
    );
  });

  it("should render the style correctly if the box is checked", () => {
    setup({ box: { ...props.box, isChecked: true } });

    expect(screen.getByTestId("number-card")).toHaveStyle(
      "background-color : rgb(173, 216, 230)"
    );
  });

  it("should render the number correctly", () => {
    setup(props);

    expect(screen.getByText(props.box.value)).toBeVisible();
  });

  it("should render text `FREE` correctly", () => {
    setup({ box: { ...props.box, value: "FREE" } });

    expect(screen.getByText("FREE")).toBeVisible();
  });
});
