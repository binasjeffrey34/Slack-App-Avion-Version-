import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { FormCreatingChannel } from "../components/Forms/FormCreatingChannel";
import { AccountProvider } from "../Context/AccountContext";
import { test, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

test("click to open channel form", () => {
  render(
    <Router>
      <AccountProvider>
        <FormCreatingChannel />
      </AccountProvider>
    </Router>
  );
  const createChannelForm = screen.getByTestId("open-channel-form");
  userEvent.click(createChannelForm);
});

test("create a channel button", () => {
  render(
    <Router>
      <AccountProvider>
        <FormCreatingChannel />
      </AccountProvider>
    </Router>
  );
  const CreateChannelButton = screen.getByText("Create Channel");
  expect(CreateChannelButton).toBeInTheDocument();
});
