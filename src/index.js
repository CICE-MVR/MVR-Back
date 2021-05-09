import app from "./server";
import "./database";

app.server.listen(app.port, () => {
  console.log("Server on port: ", app.port);
});
