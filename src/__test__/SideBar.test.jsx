import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountProvider } from "../Context/AccountContext";
import { test, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { SideBar } from "../components/SideBar/SideBar";

test("Click add channel", () => {
  render(
    <Router>
      <AccountProvider>
        <SideBar />
      </AccountProvider>
    </Router>
  );
  const addChannel = screen.getByText("Add Channels");
  expect(addChannel).toBeInTheDocument();
  userEvent.click(addChannel);
});
