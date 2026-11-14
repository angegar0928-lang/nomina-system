const { pool } = require("../backend/database");

async function getEmployeeByDocument(documentNumber) {
  const result = await pool.query(
    `SELECT
       e.id,
       e.document_type,
       e.document_number,
       e.first_name,
       e.last_name,
       e.email,
       e.phone,
       c.contract_type,
       c.start_date,
       c.end_date,
       c.salary,
       c.status
     FROM employees e
     LEFT JOIN employment_contracts c
       ON c.employee_id = e.id
     WHERE e.document_number = $1
     ORDER BY c.start_date DESC`,
    [documentNumber]
  );

  return result.rows;
}

async function getAllEmployees() {
  const result = await pool.query(
    `SELECT
       e.id,
       e.document_number,
       e.first_name,
       e.last_name,
       c.salary,
       c.status
     FROM employees e
     LEFT JOIN employment_contracts c
       ON c.employee_id = e.id
     ORDER BY e.id DESC`
  );

  return result.rows;
}

module.exports = {
  getEmployeeByDocument,
  getAllEmployees
};
