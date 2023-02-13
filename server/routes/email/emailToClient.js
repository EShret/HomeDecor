const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post('/', function (req, res, next) {
    var CART = req.body.CART;
    var totalCost = req.body.totalCost;
    var deliveryType = req.body.deliveryType;
    var paymentMethod = req.body.paymentMethod;
    var сity = req.body.сity;
    var address = req.body.address;
    var name = req.body.name;
    var phone = req.body.phone;
    var insta = req.body.insta;
    var email = req.body.email;
    var comments = req.body.comments;
    var status = req.body.status;


    var sendHtml = `
    <div>
      <div>Вид доставки : <b>${deliveryType}</b></div>
      <div>Способ оплаты : <b>${paymentMethod}</b></div>
      <div>Фамилия, имя : <b>${name}</b></div>
      <div>Номер телефона : <b>${phone}</b></div>
      <div>Город : <b>${сity}</b></div>
      <div>Адрес доставки : <b>${address}</b></div>
      <div>Instagram : <b>${insta}</b></div>
      <div>E-mail : <b>${email}</b></div>
      <div>Комментарий : <b>${comments}</b></div>
      <div>status : <b>${status}</b></div>
      <div>totalCost : <b>${totalCost}</b></div>
      <br>
      <div>Список : <b>${CART}</b></div>
    </div>`;

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Сообщение с сайта 'HomeDecor'",
        html: sendHtml
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    res.status(200).json({ message: req.body.totalCost });
});

module.exports = router;
