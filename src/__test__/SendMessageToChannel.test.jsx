import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SendMessageToChannel from "../components/ChannelMessages/SendMessageToChannel";
import { AccountProvider } from "../Context/AccountContext";
import { test, expect } from "vitest";

test("send message to channel", () => {
  render(
    <Router>
      <AccountProvider>
        <SendMessageToChannel />
      </AccountProvider>
    </Router>
  );
  const sendButton = screen.getByTestId("Send");
  expect(sendButton).toBeInTheDocument();
});
