import * as express from "express";
import { Application } from "express";
import { addPushSubscriber } from "./add-push-subscriber.route";
import { sendNewsletter } from "./send-newsletter.route";
const bodyParser = require("body-parser");

const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BI07ZOZOaLjLMCwCsuwUAUe2Zvve8LJ_t2JS0DR-Q7RZCBHGlIKpSaOrmWuPSUXmWYG888qgCn1TCU3kFtYAqHQ",
  privateKey: "PVsZ6Z-15AUEMVA77jmgOAjn3UJsxh8qzMvOh-Y05Jo",
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app: Application = express();
app.get("/", (req, res) =>
  res.send("Welcome to the Push Notifications API Page!")
);

app.use(bodyParser.json());

// REST API
app.route("/api/notifications").post(addPushSubscriber);

app.route("/api/newsletter").post(sendNewsletter);

// launch an HTTP Server
app.listen(9000, function () {
  console.log("HTTP Server running at http://localhost:" + this.address().port);
});
