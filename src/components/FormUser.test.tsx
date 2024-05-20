import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import FormUser from "./FormUser";

describe("MyForm Component", () => {
  test("renders correctly", () => {
    render(<FormUser />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
  });

  test("shows validation errors on submit with empty fields", async () => {
    render(<FormUser />);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/age is required/i)).toBeInTheDocument();
  });

  test("shows validation errors for invalid email and age", async () => {
    render(<FormUser />);

    userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
    userEvent.type(screen.getByLabelText(/age/i), "70");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/invalid email format/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/age must be less than 66/i)
    ).toBeInTheDocument();
  });

  test("submits correctly with valid data", async () => {
    render(<FormUser />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
    userEvent.type(screen.getByLabelText(/age/i), "30");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/age is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/age must be less than 66/i)
    ).not.toBeInTheDocument();
  });
});
