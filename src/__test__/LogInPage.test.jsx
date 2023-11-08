import { render, screen } from "@testing-library/react";
import { LogInPage } from "../pages/LogInPage";

test("renders Create Account", () => {
  render(<LogInPage />);
  const create = screen.getByText(/Create Account/i);
  expect(create).toBeInTheDocument();
});
