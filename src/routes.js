const { Router } = require("express");
const {
    createOrder,
    getAllOrders,
    listOrdersByState,
    getOrderById
} = require("./controllers/order");



const routes = Router();

routes.get("/", (req, res) => {
    res.status(200).json("hello world hamburgueria");
});



routes.get("/orders", listOrdersByState);
routes.get("/orders/:id", getOrderById);

routes.post("/orders", createOrder);

module.exports = routes;
