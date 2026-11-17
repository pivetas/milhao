const order = require("./order.mock");

function createOrder(req, res) {
    const data = req.body;
        if (!data || !data.client || !data.order || data.value === undefined) {
        return res.status(400).json({
            message: "client, order e value são obrigatórios"
        });
    }
    const newOrder = {
        id: order.length ? order[order.length - 1].id + 1 : 1,
        client: data.client,
        state: "pending",
        order: data.order,
        additional: data.additional,
        value: data.value
    };
    order.push(newOrder);
    return res.status(201).json(newOrder);
}

function updateOrderState(req, res) {
    const {client, state, order, additional, value} = req.body;

    const index = order.findIndex((item) =>  === client);
function getAllOrders(req, res) {
    return res.status(200).json(order);
};

function listOrdersByState(req, res) {
    const { state } = req.query;

    if (!state) {
        return res.status(200).json(order);
    }

    const filteredOrders = order.filter(
        (item) => item.state === state

    );
    return res.status(200).json(filteredOrders);
}

function getOrderById(req, res) {
const id = Number (req.params.id);

const found = order.find((item) => item.id === id);

if (!found) {
    return res.status(404).json({ message: "Order not found" });


}
return res.status(200).json(found);
};



module.exports = {
    createOrder,
    getAllOrders,
    listOrdersByState,
    getOrderById
};



