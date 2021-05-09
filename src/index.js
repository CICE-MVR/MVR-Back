import app from "./app";
import "./database";

app.server.listen(app.port, () => {
  console.log("Server on port: ", app.port);
});
