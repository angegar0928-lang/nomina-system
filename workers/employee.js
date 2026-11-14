function validateEmployee(employee) {
  const errors = [];

  if (!employee || typeof employee !== "object") {
    return {
      valid: false,
      errors: ["Datos del empleado inválidos"]
    };
  }

  const requiredFields = [
    "documentNumber",
    "firstName",
    "lastName",
    "startDate",
    "salary",
    "contractType"
  ];

  for (const field of requiredFields) {
    if (
      employee[field] === undefined ||
      employee[field] === null ||
      employee[field] === ""
    ) {
      errors.push(`Falta el campo: ${field}`);
    }
  }

  if (
    employee.salary !== undefined &&
    (!Number.isFinite(employee.salary) || employee.salary <= 0)
  ) {
    errors.push("El salario debe ser un número mayor que cero");
  }

  if (
    employee.startDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(employee.startDate)
  ) {
    errors.push("La fecha de ingreso no tiene un formato válido");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateEmployee };
