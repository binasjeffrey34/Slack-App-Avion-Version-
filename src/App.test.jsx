import { render, screen } from "@testing-library/react";
import App from "./App";
// first parameter accepts a string - description for the test
// second parameter - function that tests the page
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
