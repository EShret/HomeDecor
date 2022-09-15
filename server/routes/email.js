const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

router.post("/", (req, res) => {
    if (req.body.email_name && req.body.email_tel && req.body.email_message && req.body.email_approval) {
        name = req.body.email_name;
        email = req.body.email_email;
        tel = req.body.email_tel;
        message = req.body.email_message;
        theme1 = req.body.email_theme1;
        theme2 = req.body.email_theme2;
        theme3 = req.body.email_theme3;
        theme4 = req.body.email_theme4;

        sendMail(name, email, tel, message, theme1, theme2, theme3, theme4);
        res.status(200).json("Сообщение отправлено");
    } else {
        res.status(500).json({ message: "Не хватает данных для отправки почты" });
    }
});

const sendMail = (name, email, tel, message, theme1, theme2, theme3, theme4) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Сообщение с сайта 'st.com.tm'",
        html: `
        <div style="width: 100%; background-color: rgba(225, 236, 249, 0.8); border-radius: 50px; padding: 5% 0;">
        <div style="max-width: 80%; margin: 0 auto; background-color: #fff; border-radius: 30px; padding: 2% 2%;">
            <h1 style="text-align: center; margin: 0px 0px 30px 0px; font-size: 28px;">
                Сообщение с сайта "st.com.tm"
            </h1>
            <div
                style="background-color: rgba(225, 236, 249, 0.5); padding: 1.3% 1.5%; border-radius: 10px; display: flex; flex-direction: row; align-items: flex-start; margin: 0px 0px 20px 0px;">
                <p style="margin: 0px 0px 0px 0px; font-size: 16px;">
                    <b> Выбранные темы: </b>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${theme1}</span>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${theme2}</span>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${theme3}</span>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${theme4}</span>
                </p>
            </div>
            <div
                style="background-color: rgba(225, 236, 249, 0.5); padding: 1.3% 1.5%; border-radius: 10px; display: flex; flex-direction: row; align-items: flex-start; margin: 0px 0px 20px 0px;">
                <p style="margin: 0px 0px 0px 0px; font-size: 16px;">
                    <b> Имя: </b>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${name}</span>
                </p>
            </div>
            <div
                style="background-color: rgba(225, 236, 249, 0.5); padding: 1.3% 1.5%; border-radius: 10px; display: flex; flex-direction: row; align-items: flex-start; margin: 0px 0px 20px 0px;">
                <p style="margin: 0px 0px 0px 0px; font-size: 16px;">
                    <b> Email: </b>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${email}</span>
                </p>
            </div>
            <div
                style="background-color: rgba(225, 236, 249, 0.5); padding: 1.3% 1.5%; border-radius: 10px; display: flex; flex-direction: row; align-items: flex-start; margin: 0px 0px 20px 0px;">
                <p style="margin: 0px 0px 0px 0px; font-size: 16px;">
                    <b> Телоефон: </b>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">${tel}</span>
                </p>
            </div>
            <div
                style="background-color: rgba(225, 236, 249, 0.5); padding: 1.3% 1.5%; border-radius: 10px; display: flex; flex-direction: row; align-items: flex-start; margin: 0px 0px 20px 0px;">
                <p style="margin: 0px 0px 0px 0px; font-size: 16px;">
                    <b> Сообщение: </b>
                    <span style="margin: 0px 10px; font-size: 16px; color: #2951e0;">
                        ${message}
                    </span>
                </p>
            </div>
        </div>
    </div>
        `,
    });
};

module.exports = router;
