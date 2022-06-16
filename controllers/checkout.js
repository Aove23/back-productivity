const mercadopago = require("mercadopago");
const checkoutRouter = require("express").Router();
const Course = require("../models/Course");

mercadopago.configure({
  access_token:
    "TEST-6937998183824794-092819-d55f27e1697f4ca2a5411c043faa7c32-404757742",
});

checkoutRouter.post("/", async (request, response) => {
  const body = request.body;
  const { id, value } = body;
  const valueNumber = Number(value);

  // let curso;
  // try {
  //   curso = await Course.findById(id);
  //   conasole.log("CURSO", curso);
  // } catch (err) {
  //   response.json({ error: err });
  // }

  // Se valida nuevamente si el curso existe, deberia mandarse al handleError

  // if(!curso){
  //   return response.json({err: "Este curso no esta disponible"})
  // }

  // const { titulo, price, descripcion } = curso;
  let objItem = { title: "Hola Mundo", unit_price: valueNumber, quantity: 1, id: id };

  let preference = {
    items: [objItem],
    // back_urls: {
    //   success: "http://localhost:5000/feedback",
    //   failure: "http://localhost:5000/feedback",
    //   pending: "http://localhost:5000/feedback",
    // },
    // auto_return: "approved",
  };

  // console.log(preference);

  try {
    const res = await mercadopago.preferences.create(preference);
    console.log("RES-BODY *****", res.body);
    console.log("RES *****", res.body.id);
    response.json({ preferenciaId: res.body.id });
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
