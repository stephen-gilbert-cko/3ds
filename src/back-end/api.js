const route = require("express").Router();
const { Checkout } = require("checkout-sdk-node");
const cko = new Checkout("sk_test_bf908821-87a2-43bf-9e9f-77a1d4fffed2");

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
    success_url: req.body.url + "/success",
    failure_url: req.body.url + "/fail",
  });
  // Only send back the redirection URL
  res.send({
    redirectionUrl: payment.redirectLink,
  });
});

// Get payment details by cko-session-id
route.post("/getPaymentBySession", async (req, res) => {
    const details = await cko.payments.get(req.body.sessionId);
    res.send(details);
});

module.exports = route;
