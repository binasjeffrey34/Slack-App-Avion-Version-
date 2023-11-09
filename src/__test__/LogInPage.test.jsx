
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LogInPage } from "../pages/LogInPage";
import { AccountProvider } from "../Context/AccountContext";

it("render log in page", () => {
  render(
    <Router>
      <AccountProvider>
        <LogInPage />
      </AccountProvider>
    </Router>
  );
  const email = screen.getByPlaceholderText("E-mail Address");
  const password = screen.getByPlaceholderText("Password");
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  })