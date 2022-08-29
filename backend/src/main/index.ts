import db from "../infra/db/postgres/models";
import app from "../main/config/app";




db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("App listening on port 3000");
  });
});
