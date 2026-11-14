const test = require("node:test");
const assert = require("node:assert/strict");

const { validateEmployee } = require("../workers/employee");

test("Acepta un empleado con datos completos", () => {
  const employee = {
    documentNumber: "1000000001",
    firstName: "Carlos",
    lastName: "Perez",
    startDate: "2026-01-01",
    salary: 2000000,
    contractType: "indefinite"
  };

  assert.equal(validateEmployee(employee).valid, true);
});

test("Rechaza un salario inválido", () => {
  const employee = {
    documentNumber: "1000000001",
    firstName: "Carlos",
    lastName: "Perez",
    startDate: "2026-01-01",
    salary: -100,
    contractType: "indefinite"
  };

  assert.equal(validateEmployee(employee).valid, false);
});
