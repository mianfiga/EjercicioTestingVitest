import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter.jsx";

// NOTA: Recuerda que para testear correctamente el estado, necesitas usar `await`
// o `findBy...` en casos más complejos, pero para los clics simples, `fireEvent.click`
// suele ser suficiente.

//RECOMENDACION: Sigue el patrón AAA (Arrange, Act, Assert) en cada test para mantener claridad.
//PONER await donde sea necesario, sobretodo en los fireEvent en casos más complejos, pero en estos básicos no es obligatorio
describe("Counter Component", () => {
  // --- TEST 1: Verificar el estado inicial ---
  it("debe renderizar el contador con el valor inicial de 0", () => {
    // ARRANGE: Renderizar el componente
    render(<Counter />);

    // ACT: No hay acción

    // ASSERT: Verificar el valor en el DOM
    expect(screen.getByTestId("current-count")).toHaveTextContent("0");
  });

  // --- TEST 2: Incremento básico (AAA) ---
  it("debe incrementar el contador en 1 al hacer clic", async () => {
    // ARRANGE
    render(<Counter />);
    const incrementButton = screen.getByTestId("btn-incrementar");

    // ACT
    //await no es obligatorio aquí pero puede ser útil en casos más complejos
    fireEvent.click(incrementButton);

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("1");
  });

  // --- TEST 3: Límite Mínimo (Caso Borde) ---
  it("debe mostrar la advertencia de límite mínimo al iniciar y no permitir decrementar", async () => {
    // ARRANGE
    render(<Counter />);

    // ASSERT
    expect(screen.getByTestId("min-warning")).toHaveTextContent(
      "Límite Mínimo alcanzado."
    );
  });

  // --- TEST 4: Decremento básico ---
  it("debe decrementar el contador en 1 al hacer clic", async () => {
    // ARRANGE
    const INITIAL_VALUE = 5;
    render(<Counter initialValue={INITIAL_VALUE} />);
    const decrementButton = screen.getByTestId("btn-decrementar");

    // ACT
    fireEvent.click(decrementButton);

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("4");
  });

  // --- TEST 5: Límite Máximo ---
  it("Al llegar al límite máximo no debe seguir incrementando y debe mostrar el texto de alerta", async () => {
    // ARRANGE
    const MAX_VALUE = 5;
    render(<Counter maxValue={MAX_VALUE} />);
    const incrementButton = screen.getByTestId("btn-incrementar");

    // ACT
    for (let i = 0; i < MAX_VALUE + 1; i++) {
      await fireEvent.click(incrementButton);
    }

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent(
      `${MAX_VALUE}`
    );

    expect(screen.getByTestId("max-warning")).toHaveTextContent(
      "Límite Máximo alcanzado."
    );
  });

  // --- TEST 6: Incremento hasta el máximo y verificar estado del botón ---
  it("Al llegar al límite máximo no debe seguir incrementando", async () => {
    // ARRANGE
    const MAX_VALUE = 5;
    render(<Counter maxValue={MAX_VALUE} />);
    const incrementButton = screen.getByTestId("btn-incrementar");

    // ACT
    for (let i = 0; i < MAX_VALUE + 1; i++) {
      await fireEvent.click(incrementButton);
    }

    // ASSERT
    expect(incrementButton).toHaveAttribute("disabled");
  });

  // --- TEST 7: Decremento hasta el mínimo y verificar estado del botón ---
  it("Al llegar al límite mínimo no debe seguir decrementando y el botón debe estar deshabilitado", async () => {
    // ARRANGE
    render(<Counter />);
    const decrementButton = screen.getByTestId("btn-decrementar");

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent("0");
    expect(decrementButton).toHaveAttribute("disabled");
  });

  // --- TEST 8: Resetear el contador ---
  it("debe resetear el valor del contador al hacer click en reset", async () => {
    // ARRANGE
    const INITIAL_VALUE = 5;
    render(<Counter initialValue={INITIAL_VALUE} />);
    const incrementButton = screen.getByTestId("btn-incrementar");
    const resetButton = screen.getByTestId("btn-reset");

    // ACT
    await fireEvent.click(incrementButton);
    await fireEvent.click(resetButton);

    // ASSERT
    expect(screen.getByTestId("current-count")).toHaveTextContent(
      `${INITIAL_VALUE}`
    );
  });
});
