import { render, screen } from "@testing-library/react";
import { Header } from ".";

/**
 * Veja que o ActiveLink faz uso do useRouter (funcionalidade externa ao componente).
 * Logo, e necessario criar esse mock.
 */
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

/**
 * Veja que o SignInButton faz uso do useSession (funcionalidade externa ao componente).
 * Logo, e necessario criar esse mock.
 */
jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

// vai criar uma categorizacao dos testes
describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
