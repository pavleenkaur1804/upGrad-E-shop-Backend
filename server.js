const express = require("express");

bodyParser = require("body-parser");
const cors=require('cors');
const app = express();
var corsOptions={
  origin:"http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Cannot Connect to Database.");
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Upgrad Eshop Project.",
  });
});

require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
// require("./routes/product.routes")(app);
// require("./routes/order.routes")(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});