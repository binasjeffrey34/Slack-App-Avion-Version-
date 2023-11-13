// Your test file
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AccountProvider } from "../Context/AccountContext";
import { AddPeople } from "../components/AddUserChannel/AddPeople";
import { Dashboard } from "../pages/Dashboard";

const MockAddPeople = () => {
  return (
    <Router>
      <AccountProvider>
        <>
          <AddPeople />
          <Dashboard />
        </>
      </AccountProvider>
    </Router>
  );
};

describe("Open FormAddUser Modal", () => {
  it("click Add People button to open the form", async () => {
    render(<MockAddPeople />);

    //get the button
    const buttonAdd = screen.getByRole("openFormAddUser");
    // Click Add People Button
    fireEvent.click(buttonAdd);

    const formAddUserModal = screen.getByTestId("formAddUser");
    //after clicking the btn the form add user should be in the document
    expect(formAddUserModal).toBeInTheDocument();

    //get the close(X) button icon
    const closeForm = screen.getByTestId("closeForm");
    //click the close(x) button
    fireEvent.click(closeForm);
    //after clicking the close(X) btn the form add user should be NOT in the document
    expect(formAddUserModal).not.toBeInTheDocument();
  });
});
