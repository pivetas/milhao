const { Router } = require("express");
const {
    createOrder,
    listOrdersByState,
    getOrderById,
    updateOrder,
    updateState,
    deleteOrder
} = require("./controllers/order");



const routes = Router();

routes.get("/", (req, res) => {
    res.status(200).json("hello world hamburgueria");
});



routes.get("/orders", listOrdersByState);

routes.get("/orders/:id", getOrderById);

routes.post("/orders", createOrder);

routes.put("/orders/:id", updateOrder);

routes.put("/orders/:id/state", updateState);

routes.delete("/orders/:id", deleteOrder);



module.exports = routes;
