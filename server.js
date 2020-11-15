const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const OTPmodel = require("./models/otp");
const axios = require("axios").default;
const qs = require("qs");

mongoose.connect(
  `mongodb+srv://abdallah:${process.env.MONGOdB_PASS}@mydb.pn4y4.mongodb.net/Chat_test?retryWrites=true&w=majority/otps`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("connected");
  }
);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const generateOTP = () => {
      var digits = "0123456789";
      var OTP = new Array(5)
        .fill()
        .map(() => digits[Math.floor(Math.random() * 10)])
        .reduce((a, b) => {
          return a + b;
        });
      return OTP;
    };

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    ////////////////////
    server.post("/otp", async (req, res) => {
      const { body } = req;
      if (body.phoneNumber.length === 11) {
        const param1 = generateOTP();

        const d = Date.now();
        const user = await OTPmodel.findOne({
          number: body.phoneNumber
        }).exec();

        if (user) {
          const min = 3 - (d - user.date) / 60000;
          if (min < 3 && min > 0) {
            var mins = Math.ceil(min);
            return res.end(`wait ${mins} min`);
          } else {
            // if (user.otptimes >= 5) {
            //   return res.end("Maximum time of request: Please contact us");
            // }
            OTPmodel.findByIdAndUpdate(
              user._id,
              {
                otp: param1,
                date: new Date(),
                otptimes: user.otptimes + 1
              },
              (err) => console.log(err)
            );
          }
        } else {
          const createdOTP = new OTPmodel({
            number: body.phoneNumber,
            otp: param1,
            otptimes: 1
          });
          createdOTP.save().catch((err) => console.log(err));
        }

        var options = {
          method: "POST",
          url: "https://api.ghasedak.io/v2/verification/send/simple",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            apikey: process.env.GHASEDAK_API
          },
          data: qs.stringify({
            type: "1",
            param1: param1,
            receptor: body.phoneNumber,
            template: "test",
            lineNumber: process.env.LINENUMBER
          })
        };

        axios
          .request(options)
          .then((response) => {
            console.log(response.data.result.code);
          })
          .catch((error) => {
            console.error(error);
          });

        return res.end("done");
      } else {
        res.end("Number format should be 09*** & 11 num");
      }
    });
    ////////////////////////
    server.post("/Login", async (req, res) => {
      const { body } = req;
      const user = await OTPmodel.findOne({ number: body.phoneNumber }).exec();
      const d = Date.now();

      if (Math.ceil((d - user.date) / 60000) > 5) {
        return res.end("The code time expierd");
      }
      return user.otp === body.oTP
        ? res.end("done")
        : res.end("The code is not correct");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;

      console.log("> Ready on http://localhost:3000");
    });
  })

  .catch((ex) => {
    console.error(ex.stack);

    process.exit(1);
  });
