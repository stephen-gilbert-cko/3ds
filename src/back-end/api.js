const route = require("express").Router();
const { Checkout } = require("checkout-sdk-node");
const cko = new Checkout("sk_test_0b9b5db6-f223-49d0-b68f-f6643dd4f808");

route.post("/payWith3ds", async (req, res) => {
  const payment = await cko.payments.request({
    source: {
      token: req.body.token,
    },
    currency: "GBP",
    amount: 400, // pence
    reference: "TEST-ORDER",
    "3ds": {
      enabled: true,
    },
    success_url: "http://localhost:8080/success",
    failure_url: "http://localhost:8080/fail",
  });
  // Only send back the redirection URL
  res.send({
    redirectionUrl: payment.redirectLink,
  });
});

// Get payment details by cko-session-id
// router.post("/getPaymentBySession", async (req, res) => {
//     const details = await cko.payments.get(req.body.sessionId);
//     res.send(details);
// });

module.exports = route;
