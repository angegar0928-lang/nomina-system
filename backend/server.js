const http = require("http");
const { validateEmployee } = require("../workers/employee");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health" && req.method === "GET") {
    return res.end(JSON.stringify({
      system: "Nomina System",
      status: "online",
      version: "1.0.0"
    }));
  }

  if (req.url === "/employees/validate" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;

      if (body.length > 100000) {
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const employee = JSON.parse(body);
        const result = validateEmployee(employee);

        res.writeHead(result.valid ? 200 : 400);
        res.end(JSON.stringify(result));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({
          valid: false,
          errors: ["JSON inválido"]
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: "Ruta no encontrada"
  }));
});

server.listen(PORT, () => {
  console.log(`Nomina System funcionando en puerto ${PORT}`);
});
