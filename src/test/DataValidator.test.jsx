import { describe, it, expect } from "vitest";
// 💡 IMPORTACIÓN ACTUALIZADA: Usando el nombre correcto de la función
import { calculateDiscount } from "../utils/DataValidator.js";
// Usamos 'describe' para agrupar todos los tests relacionados con la función de descuento.
describe("calculateDiscount", () => {
  // --- Tests de Éxito (Cálculos Nominales) ---

  it("debe calcular el precio con un descuento nominal del 20%", () => {
    // ARRANGE (Preparar: Precio de 100, Descuento del 20%)
    const price = 100;
    const discount = 20;

    // ACT (Ejecutar: Llamar a la función)
    const result = calculateDiscount(price, discount);

    // ASSERT (Verificar: El resultado debe ser 80)
    expect(result).toBe(80.0);
  });

  // --- Test 2 Testear con 0% de descuento (Caso Borde)
  it("debe devolver el precio original cuando el descuento es 0% ", () => {
    // ARRANGE (Preparar: Precio de cualquiera, Descuento del 0%)
    const price = Math.random() * 1000;
    const discount = 0;

    // ACT (Ejecutar: Llamar a la función)
    const result = calculateDiscount(price, discount);

    // ASSERT (Verificar: El resultado debe ser 80)
    expect(result).toBe(Number(price.toFixed(2)));
  });

  // --- Test 3 Testear con 100% de descuento (Caso Borde)
  it("debe devolver 0 cuando el descuento es 100% ", () => {
    // ARRANGE (Preparar: Precio cualquiera, Descuento del 100%)
    const price = Math.random() * 1000;
    const discount = 100;

    // ACT (Ejecutar: Llamar a la función)
    const result = calculateDiscount(price, discount);

    // ASSERT (Verificar: El resultado debe ser 0)
    expect(result).toBe(0);
  });

  // --- Test 4: Verificar que se lanza un error si el precio inicial es cero o negativo.
  describe("Errores de precio incorrecto", () => {
    it("debe lanzar error si el precio es 0", () => {
      // ARRANGE (Preparar: Precio 0, Descuento del 10%)
      const price = 0;
      const discount = 10;

      // ACT (Ejecutar: Llamar a la función)
      expect(() => calculateDiscount(price, discount)).toThrow(
        "Parámetros de entrada inválidos."
      );
    });
    it("debe lanzar error si el precio es negativo", () => {
      // ARRANGE (Preparar: Precio cualquiera negativo, Descuento del 10%)
      const price = - Math.random() * 1000;
      const discount = 10;

      // ACT (Ejecutar: Llamar a la función)
      expect(() => calculateDiscount(price, discount)).toThrow(
        "Parámetros de entrada inválidos."
      );
    });
  });
  // --- Tests 5: Precisión Decimal Verificar que el resultado se redondea correctamente a dos decimales (Punto 13).
  it("debe redondear correctamente a 2 decimales", () => {
    // ARRANGE (Preparar: Precio cualquiera, Descuento del 100%)
    const price = 0.005625;
    const discount = 20;

    // ACT (Ejecutar: Llamar a la función)
    const result = calculateDiscount(price, discount);

    // ASSERT (Verificar: El resultado debe ser 0)
    // Este precio puede ser problemático porque al ser redondeado a 3 decimales
    //  pasa a ser 0.005 por lo que al ser redondeado a 2 pasa a 0.01
    expect(result).toBe(Number((0.0045).toFixed(2)));
  });

  // -- Test 6: testear el toThrow todos los casos posibles
  // los errores de precio ya fueron testeados
  describe("Errores de descuento incorrecto", () => {
    it("debe lanzar error si el descuento es < 0%", () => {
      // ARRANGE (Preparar: Precio cualquiera, Descuento del -1%)
      const price = Math.random() * 1000;
      const discount = -1;

      // ACT (Ejecutar: Llamar a la función)
      expect(() => calculateDiscount(price, discount)).toThrow(
        "Parámetros de entrada inválidos."
      );
    });
    it("debe lanzar error si el descuento es > 100%", () => {
      // ARRANGE (Preparar: Precio cualquiera, Descuento del 10%)
      const price = Math.random() * 1000;
      const discount = 101;

      // ACT (Ejecutar: Llamar a la función)
      expect(() => calculateDiscount(price, discount)).toThrow(
        "Parámetros de entrada inválidos."
      );
    });
  });
});
