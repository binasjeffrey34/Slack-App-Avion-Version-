import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountProvider } from "../Context/AccountContext";
import { LogInPage } from "../pages/LogInPage";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("LogInPage Component", () => {
  it("check if the input is in the document", () => {
    render(
      <Router>
        <AccountProvider>
          <LogInPage />
        </AccountProvider>
      </Router>
    );
    const emailInputEl = screen.getByPlaceholderText("E-mail Address");
    const passwordInputEl = screen.getByPlaceholderText("Password");

    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    render(
      <Router>
        <AccountProvider>
          <LogInPage />
        </AccountProvider>
      </Router>
    );

    const emailInputEl = screen.getByPlaceholderText("E-mail Address");
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const submitForm = screen.getByTestId("loginForm");

    userEvent.type(emailInputEl, "mie@email.com");
    userEvent.type(passwordInputEl, "mie123");
    fireEvent.submit(submitForm);

    // Wait for the values to be cleared after submission
    await waitFor(() => {
      expect(emailInputEl.value).toBe("");
      expect(passwordInputEl.value).toBe("");
    });
  });
});
