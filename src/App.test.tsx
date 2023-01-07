import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App unit test suite", () => {
  const setup = () => {
    return render(<App />);
  };

  it("should render component correctly first time", () => {
    setup();

    const labelElement = screen.getByText("Name*");
    const buttonElement = screen.getByRole("button", {
      name: "Start playing!",
    });
    const inputElement = screen.getByRole("textbox");
    const bingoCardElement = screen.queryByTestId("bingo-card");

    expect(bingoCardElement).not.toBeInTheDocument();
    expect(labelElement).toBeVisible();
    expect(buttonElement).toBeVisible();
    expect(buttonElement).not.toBeEnabled();
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveValue("");
  });

  it("should update input field when user types", () => {
    setup();

    const text = "random text";
    const inputElement = screen.getByRole("textbox");

    userEvent.type(inputElement, text);

    expect(inputElement).toHaveValue(text);
  });

  it("should enable `start playing` button when input field is not empty", () => {
    setup();

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", {
      name: "Start playing!",
    });

    userEvent.type(inputElement, "random text");

    expect(buttonElement).toBeEnabled();
  });

  it("should show bingo card section correctly", () => {
    setup();

    const playerName = "player name";
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", {
      name: "Start playing!",
    });

    userEvent.type(inputElement, playerName);
    userEvent.click(buttonElement);

    const bingoCardElement = screen.getByTestId("bingo-card");
    const playerWelcomeElement = screen.getByText(`Welcome ${playerName}!!`);

    expect(bingoCardElement).toBeInTheDocument();
    expect(playerWelcomeElement).toBeVisible();
  });
});
