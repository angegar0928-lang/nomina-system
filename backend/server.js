const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify({
      system: "Nomina System",
      status: "online",
      version: "1.0.0"
    }));
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
