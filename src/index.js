import app from "./app";

app.server.listen(app.port, () => {
  console.log("Server on port: ", app.port);
});
