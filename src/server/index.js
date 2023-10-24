
const https = require('https');
const http = require('http')

const fs = require('fs')

// const hostname = '192.168.137.1';
const port = 3119;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

var url = require('url');

var cors = require('cors')

const authApi = (req, res) => {
    res.send("Thank you for you accept connection. AfU Website will be worked")
}

const createOrder = (req, res) => {
    const params = req.body;
    console.log(params)
    const sdk = require('api')('@scalapaydocs/v1.1#5ryqsdllosocp4');

    sdk.auth('Bearer qhtfs87hjnc12kkos');
    sdk.postV2Orders({
        totalAmount: { currency: 'EUR', amount: String(params.totalAmount) },
        consumer: { givenNames: params.consumer.givenNames, surname: params.consumer.surname },
        shipping: {
            countryCode: params.shipping.countryCode,
            name: params.shipping.name,
            postcode: params.shipping.postcode,
            suburb: params.shipping.suburb,
            line1: params.shipping.line1
        },
        merchant: {
            redirectCancelUrl: 'https://portal.integration.scalapay.com/failure-url',
            redirectConfirmUrl: 'https://portal.integration.scalapay.com/success-url'
        },
        shippingAmount: { currency: 'EUR', amount: params.shippingAmount.amount },
        taxAmount: { currency: 'EUR', amount: params.taxAmount.amount },
        type: 'online',
        product: 'pay-in-4',
        frequency: { number: 1, frequencyType: 'monthly' },
        orderExpiryMilliseconds: 600000,
        items: [
            {
                price: { currency: 'EUR', amount: params.item.price.amount },
                gtin: 'JAN',
                quantity: params.item.quantity,
                name: params.item.name,
                category: params.item.category,
                sku: params.item.sku,
                subcategory: ['shirt']
            },
        ]
    })
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
}

app.use(express.static('public'));
app.use('/image', express.static('image'));
app.use(cors())

// GET
app.get("/api", authApi)

app.post("/api/create-order", createOrder)


// Creating object of key and certificate
// for SSL
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

const server = http.createServer(options, app)
server.listen(port, function (req, res) {
    console.log("Server started at port " + port);
});

