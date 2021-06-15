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
  console.log("Response from array : ", JSON.stringify(subArray));
  webpush.setVapidDetails(
    "mailto:er.surajnegi@gmail.com",
    "BEkMSjyYz419Tin6LcdSprjU4bDTrlpSMSINPgPaJpBngb3dgWAiJxEcLC4LcekSOyEF6ROIdWg4UAwaY56qoEQ",
    "lVcKunTiuWNNfhBbM1X8dXOC_2l3oATW82mSkxdzI50"
  );
  var pushConfig = {
    endpoint:
      "https://wns2-sg2p.notify.windows.com/w/?token=BQYAAAD10m0xMgeHXHRxaK71CAuRUzGEqZY20sdvcwnwsemcxVRgWzotvrSjR8xTA3yhi9jNhlKp3KKudKU1oAe4kTr9B%2fNuBxOFCHc%2bw6GIi6ljpDCD8CIftAvYW8zvFak2xfrxDbEblPmew9wqCqLo38B%2bVYcBUq4QgdHbxi9nydKV4UEXetmGNBGSR9e5lJUujZhYrgNsc4q5fJGnZlN%2bcKdcoTxuXgnZ8FaAtgFGD1dOEOeht7JffQ2jGNiOkLsYDQ9aHrVFKD75plmCcmJA3NbD8O3mdzZ6ykwc4Ovy0iyf0yEbL3knHgaL%2fz4MIqKvLmk%3d",
    keys: {
      auth: "P80LwcJYaP-UrBkdNri1Tg",
      p256dh:
        "BDJ940QHVbD1JyisRc6z9lKWy9Od7XE-VpYOLPO3n9bl83-0WGEDmBQ2pWB4LhZr6vaVp1lhe8iSu1Vm8VVQDOI",
    },
  };
  console.log("Push Config : ", JSON.stringify(pushConfig));
  webpush
    .sendNotification(
      pushConfig,
      JSON.stringify({
        title: "New Post from FireBase Server",
        content: "New Post added!",
        openUrl: "/help",
      })
    )
    .then(function (data) {
      console.log("push success");
    })
    .catch(function (err) {
      console.log(err);
    });
  res.send("HI");
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
