const express = require("express");
const app = express();

const port = 3000

// other libraries
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// routers and middlewares
// sale order
const saleOrderMiddleware = require("./middlewares/sale_order_middleware");
app.use("/sale_order", saleOrderMiddleware);

const saleOrderRouter = require("./routers/sale_order_router");
app.use("/sale_order", saleOrderRouter);

// webhook
const webhookMiddleware = require("./middlewares/webhook_middleware");
app.use("/webhook", webhookMiddleware);

const webhookRouter = require("./routers/webhook_router");
app.use("/webhook", webhookRouter);

// listen
app.listen(port);