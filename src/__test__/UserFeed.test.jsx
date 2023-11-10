import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, test } from "vitest";
import { AccountProvider } from "../Context/AccountContext";
import { UserFeed } from "../components/UserMessages/UserFeed";

test("render Sending Message", () => {
  render(
    <Router>
      <AccountProvider>
        <UserFeed />
      </AccountProvider>
    </Router>
  );

  const send = screen.getByText("View Profile");
  expect(send).toBeInTheDocument();
});
