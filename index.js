var express = require("express");
var app = express();
var webpush = require("web-push");
const fetch = require("node-fetch");

const port = process.env.PORT || 3000;

app.get("/test", async (req, res) => {
  const response = await fetch(
    "https://pwatest-negi-default-rtdb.firebaseio.com/subscriptions.json"
  );

  const dataFromFirebase = await response.json();
  let subArray = [];
  Object.keys(dataFromFirebase).forEach((item) => {
    subArray.push(dataFromFirebase[item]);
  });
  webpush.setVapidDetails(
    "mailto:er.surajnegi@gmail.com",
    "BEkMSjyYz419Tin6LcdSprjU4bDTrlpSMSINPgPaJpBngb3dgWAiJxEcLC4LcekSOyEF6ROIdWg4UAwaY56qoEQ",
    "lVcKunTiuWNNfhBbM1X8dXOC_2l3oATW82mSkxdzI50"
  );
  subArray.forEach((item) => {
    var pushConfig = {
      endpoint: item.endpoint,
      keys: {
        auth: item.keys.auth,
        p256dh: item.keys.p256dh,
      },
    };
    webpush
      .sendNotification(
        pushConfig,
        JSON.stringify({
          title: "New Post from FireBase Server",
          content: "New Post added!",
        })
      )
      .then(function (data) {
        console.log("push success");
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  res.send(`Send Notifications to ${subArray.length} devices!!`);
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
