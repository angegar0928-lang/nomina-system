const { pool } = require("../backend/database");

async function createEmployee(employee) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO employees
       (document_type, document_number, first_name, last_name, email, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        employee.documentType,
        employee.documentNumber,
        employee.firstName,
        employee.lastName,
        employee.email || null,
        employee.phone || null
      ]
    );

    const employeeId = result.rows[0].id;

    await client.query(
      `INSERT INTO employment_contracts
       (employee_id, contract_type, start_date, salary)
       VALUES ($1, $2, $3, $4)`,
      [
        employeeId,
        employee.contractType,
        employee.startDate,
        employee.salary
      ]
    );

    await client.query("COMMIT");

    return { success: true, employeeId };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
}

module.exports = { createEmployee };
