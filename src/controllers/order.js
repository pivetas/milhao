const order = require("./order.mock");

function createOrder(req, res) {
    const data = req.body;
    if (!data || !data.client || !data.order || data.value === undefined) {
        return res.status(400).json({
            message: "client, order e value são obrigatórios"
        });
        //valda se chega todas as informaçoes necessarias
    }
    const newOrder = {
        id: order.length ? order[order.length - 1].id + 1 : 1,
        client: data.client,
        state: "pending",
        //pra ja começar pendente
        order: data.order,
        additional: data.additional,
        value: data.value
    };
    order.push(newOrder);
    return res.status(201).json(newOrder);
}



//----------------------------------------------------------------
//lista o pedido por estado, se nao especificar nenhum ele retorna todos os pedidos
function listOrdersByState(req, res) {
    const { state } = req.query;
    //cria uma constante comm um array de status que pede os dados la do order, isso é o req.query

    if (!state) {
        return res.status(200).json(order);
    }

    const filteredOrders = order.filter(
        (item) => item.state === state

    );
    //o order order.filtrer percorre todo o array e filtra o pedido
    //o item => é o pedido que esta sendo verificado
    //o item.state == state compara com o statdo da url o estado do pedido 
    return res.status(200).json(filteredOrders);
}

//-------------------------------------------------------------------------------------------------------

function getOrderById(req, res) {
    const id = Number(req.params.id);

    const found = order.find((item) => item.id === id);

    //order.find é a função pra achar um item no array
    //o => item.id===id pega o id do item e compara do item posto na url 


    if (!found) {
        return res.status(404).json({ message: "Order not found" });


    }
    return res.status(200).json(found);
    //so pega oq achou la na const found
}

function getAllOrders(req, res) {
    return res.status(200).json(order);
};

function updateOrder(req, res) {
    const { client, state, order: snack, additional, value } = req.body || {};
    //vai pegar todas as informaçoes do body

    const index = order.findIndex((item) => item.id === parseInt(req.params.id));
    //percorre todo o array procurando o index do id pedido para mudar o index na tabela, ou sej aeu pedi o index id 6 e o id 6 
    // é o index 2 entao eu vou mudar o index 2 da tabela
    //o parse int é para mudar o formato do id que é mandando como dtring na url e o parse int muda ele pra inteiro no codigo

    if (index === -1) {
        return res.status(404).json({ message: "order not found" });
    }//caso n encontre o index
    if (!client || !snack || value === undefined) {
        return res.status(400).json({ message: "client, order and value are required" });
    }
    //caso na hora de atualizar, nao ter as informaçoes sufientes
    const updatedOrder = {
        id: order[index].id,
        client: client,
        state: state || order[index].state,
        //ou muda o estado se ja tiver, ou se o a order do index pedir estiver vazia ela esta pedente
        order: snack,
        additional: additional,
        value: value


    };
    //so muda as inforçoes
    order[index] = updatedOrder;
    //troca o pedido antigo que esta no index do array pelo atual no mesmo index
    return res.status(200).json(updatedOrder);


}

const validStates = ["pending", "preparing", "delivering", "delivered"];

//para ter estados estabelecidos para o estado do lanche

function updateState(req, res) {
    const id = Number(req.params.id);
    const { state } = req.body || {};
    //pega o novo estado do body
    const found = order.find((item) => item.id === id);
    //vai procurar o id dentro do array e validar com o a url

    if (!found) {
        return res.status(404).json({ message: "Order not found" });
    }
    if (!state || !validStates.includes(state)) {
        return res.status(404).json({ message: "invelid state: use {pending, preparing, delivering, delivered}" });
    }

    found.state = state;
    //vai tranformar o estado achado no novo state

    return res.status(200).json(found);
}

function deleteOrder(req, res) {
    const id = Number(req.params.id);



    const index = order.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    order.splice(index, 1);
    //tira so um que é o index que eu quero

    return res.status(200).json({ message: "order deleted successfully" });
};
module.exports = {
    createOrder,
    listOrdersByState,
    getOrderById,
    updateOrder,
    updateState,
    deleteOrder
};





