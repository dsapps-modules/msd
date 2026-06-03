import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DivulgadorLayout } from "../DivulgadorLayout";

const usePathnameMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("DivulgadorLayout", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/pt-BR/divulgador/campanhas/123/edit");
  });

  it("keeps Campanhas active on child routes and renders logout action", () => {
    const onLogout = jest.fn();

    render(
      <DivulgadorLayout
        userName="Ana"
        roleLabel="Admin"
        isAdmin={true}
        onLogout={onLogout}
      >
        <div>Conteudo</div>
      </DivulgadorLayout>
    );

    expect(screen.getByText("Campanhas").closest("a")).toHaveClass("bg-slate-900");
    expect(screen.getByText("Conteudo")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
