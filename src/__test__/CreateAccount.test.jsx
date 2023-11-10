import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import { AccountProvider } from "../Context/AccountContext";
import { expect, test } from "vitest";

test("render create account page", () => {
  render(
    <Router>
      <AccountProvider>
        <CreateAccount />
      </AccountProvider>
    </Router>
  );
  const signUp = screen.queryByText(/Sign up/i);
  expect(signUp).toBeInTheDocument();
});
