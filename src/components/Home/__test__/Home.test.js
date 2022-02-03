import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FirestoreProvider } from "../../../contexts/FirestoreContext";
import { AuthProvider } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../../../app/store";

import Checkout from "../../Checkout/Checkout.js";
import Header from "../../Header/Header";
import Home from "../Home.js";

describe("Integration tests: <Home /> <Checkout />", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <FirestoreProvider>
          <AuthProvider>
            <BrowserRouter>
              <Header />
              <Home />
              <Checkout />
            </BrowserRouter>
          </AuthProvider>
        </FirestoreProvider>
      </Provider>
    );
  });

  beforeEach(() => {
    const addProduct1 = screen.getAllByText("Ajouter au panier")[0];
    const addProduct2 = screen.getAllByText("Ajouter au panier")[1];
    fireEvent.click(addProduct1);
    fireEvent.click(addProduct2);
    fireEvent.click(addProduct2);
  });

  it("should add or delete a product from the basket properly and update the subtotal", () => {
    const basket = screen.getAllByTestId("basket")[0];
    expect(basket.textContent).toBe("3");
    screen.getByText("Qté: 1");
    screen.getByText("Qté: 2");
    const subtotal = screen.getAllByTestId("subtotal")[0];
    expect(subtotal.textContent).toBe("Sous-total (3 articles): 1459.97 €");

    fireEvent.click(screen.getAllByText("Supprimer")[1]);

    expect(basket.textContent).toBe("1");
    screen.getByText("Qté: 1");
    expect(subtotal.textContent).toBe("Sous-total (1 article): 559.99 €");

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: 2 } });

    screen.getByText("Qté: 2");
    expect(subtotal.textContent).toBe("Sous-total (2 articles): 1119.98 €");
    expect(basket.textContent).toBe("2");

    fireEvent.click(screen.getByText("Supprimer"));

    screen.getByText("Votre panier Amazon est vide");
    expect(subtotal).not.toBeInTheDocument();
    expect(basket.textContent).toBe("0");
  });

  it("should check the proper input when a gift option is added", () => {
    const inputItem1 = screen.getAllByRole("checkbox", {
      name: "Ceci sera un cadeau",
    })[0];
    const inputItem2 = screen.getAllByRole("checkbox", {
      name: "Ceci sera un cadeau",
    })[1];
    const inputSubtotal = screen.getByRole("checkbox", {
      name: "Commande contenant un cadeau",
    });

    fireEvent.click(inputItem1);
    expect(inputItem1).toBeChecked();
    expect(inputItem2).not.toBeChecked();
    expect(inputSubtotal).toBeChecked();

    fireEvent.click(inputItem2);
    expect(inputItem1).toBeChecked();
    expect(inputItem2).toBeChecked();
    expect(inputSubtotal).toBeChecked();

    fireEvent.click(inputSubtotal);
    expect(inputItem1).not.toBeChecked();
    expect(inputItem2).not.toBeChecked();
    expect(inputSubtotal).not.toBeChecked();

    fireEvent.click(inputSubtotal);
    expect(inputItem1).toBeChecked();
    expect(inputItem2).toBeChecked();
    expect(inputSubtotal).toBeChecked();

    fireEvent.click(inputItem1);
    expect(inputItem1).not.toBeChecked();
    expect(inputItem2).toBeChecked();
    expect(inputSubtotal).toBeChecked();
  });
});
