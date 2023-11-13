import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountProvider } from "../Context/AccountContext";
import CreateAccount from "../pages/CreateAccount";
import { describe, it, expect } from "vitest";

const MockCreateAccount = () => {
  return (
    <Router>
      <AccountProvider>
        <CreateAccount />
      </AccountProvider>
    </Router>
  );
};

describe("Create Account Component", () => {
  it("validating input", async () => {
    render(<MockCreateAccount />);

    const emailInputEl = screen.getByPlaceholderText("E-mail Address");
    const password1InputEl = screen.getByPlaceholderText("Create Password");
    const password2InputEl = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(emailInputEl, { target: { value: "mie@email.com" } });
    fireEvent.change(password1InputEl, { target: { value: "mie123" } });
    fireEvent.change(password2InputEl, { target: { value: "mie123" } });

    expect(emailInputEl.value).toEqual("mie@email.com");
    expect(password1InputEl.value.length).toBeGreaterThanOrEqual(6);
    expect(password1InputEl.value).toEqual(password2InputEl.value);
  });
});
