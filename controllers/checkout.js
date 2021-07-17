const mercadopago = require("mercadopago");
const checkoutRouter = require("express").Router();
const Course = require("../models/Course");

mercadopago.configure({
  access_token: "TEST-a74efbec-5589-4617-9391-0c6db1d98f31",
});

checkoutRouter.post("/", async (request, response) => {
  const body = request.body;
  const { id } = body;

  let curso;
  try {
    curso = await Course.findById(id);
  } catch (err) {
    response.json({ error: err });
  }

  // Se valida nuevamente si el curso existe, deberia mandarse al handleError

  // if(!curso){
  //   return response.json({err: "Este curso no esta disponible"})
  // }

  const { titulo, price, descripcion } = curso;
  let objItem = { title: titulo, unit_price: price, quantity: 1, id: id };

  let preference = {
    items: [objItem],
    back_urls: {
      success: "http://localhost:5000/feedback",
      failure: "http://localhost:5000/feedback",
      pending: "http://localhost:5000/feedback",
    },
    auto_return: "approved",
  };

  console.log(preference);

  try {
    const res = await mercadopago.preferences.create(preference);
    response.json({ id: res.body.id });
  } catch (err) {
    console.log(err);
  }
});

checkoutRouter.get("/feedback", function (request, response) {
  response.json({
    Payment: request.query.payment_id,
    Status: request.query.status,
    MerchantOrder: request.query.merchant_order_id,
  });
});

module.exports = checkoutRouter;
