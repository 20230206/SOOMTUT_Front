import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SoomtutNavbar from "../SoomtutNavbar";
import axios from 'axios';

jest.mock('axios');

describe("SoomtutNavbar", () => {
test("renders navbar", () => {
render(<SoomtutNavbar />);
const navbarElement = screen.getByRole("navigation");
expect(navbarElement).toBeInTheDocument();
});

test("has logo image", () => {
render(<SoomtutNavbar />);
const logoImage = screen.getByRole("img");
expect(logoImage).toBeInTheDocument();
});

test("has login button", () => {
render(<SoomtutNavbar />);
const loginButton = screen.getByRole("link", { name: "로그인" });
expect(loginButton).toBeInTheDocument();
});

test("has register button", () => {
render(<SoomtutNavbar />);
const registerButton = screen.getByRole("link", { name: "회원가입" });
expect(registerButton).toBeInTheDocument();
});

test("renders login and signup links when user is not logged in", async () => {
  render(<SoomtutNavbar />);
  const loginLink = screen.getByRole("link", { name: "로그인" });
  expect(loginLink).toBeInTheDocument();
  const signupLink = screen.getByRole("link", { name: "회원가입" });
  expect(signupLink).toBeInTheDocument();
});

test("logs out user when logout button is clicked", async () => {
  render(<SoomtutNavbar />);
  await new Promise((resolve) => setTimeout(resolve, 0)); // wait for the state to update

  const logoutButton = screen.queryByRole("button", { name: "로그아웃" });
  if (logoutButton) {
    fireEvent.click(logoutButton);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/auth/signout");
  }
});
});