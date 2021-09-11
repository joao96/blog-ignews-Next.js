import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import { SignInButton } from ".";

/**
 * Veja que o SignInButton faz uso do useSession (funcionalidade externa ao componente).
 * Logo, e necessario criar esse mock.
 */
jest.mock("next-auth/client");

// vai criar uma categorizacao dos testes
describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    // somente na proxima vez que a useSession for chamada, ira retornar [null, false]
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign In with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    // somente na proxima vez que a useSession for chamada, ira retornar um user logado
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);
    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
