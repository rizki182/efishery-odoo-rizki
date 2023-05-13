const express = require("express");
const app = express();

const port = 3000

// other libraries
app.use(express.json());

// routers
const saleOrderRouter = require("./routers/sale_order_router");
app.use("/", saleOrderRouter);

// listen
app.listen(port);