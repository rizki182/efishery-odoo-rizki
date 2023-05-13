const express = require("express");
const app = express();

const port = 3000

// other libraries
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// routers
const saleOrderRouter = require("./routers/sale_order_router");
app.use("/sale_order", saleOrderRouter);

const webhookRouter = require("./routers/webhook_router");
app.use("/webhook", webhookRouter);

// listen
app.listen(port);