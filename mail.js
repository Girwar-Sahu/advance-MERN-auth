import doteenv from "dotenv";
doteenv.config();
import sgmail from "@sendgrid/mail";

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "girwar.sahu@rungta.org",
  name: "mern auth",
  from: "girvar786sahu@gmail.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgmail
  .send(msg)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
