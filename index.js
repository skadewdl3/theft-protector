const express = require("express");
const { Deta } = require("deta");
const bodyParser = require("body-parser");
const cors = require("cors");

const projectKey = "d082eiro_2xPnXNtVwAUYCw1VmkC28tcQN77xBnqo";
const deta = Deta(projectKey);

const app = express();

app.use(bodyParser.json());
app.use(cors());

// projid = d082eiro

app.post("/createcrasher", async (req, res) => {
  const crashers = deta.Base("crashers");
  let x = await crashers.get(req.body.name);
  if (!x) {
    await crashers.put(false, req.body.name);
    res.send("Crasher created");
  } else {
    res.send("Crasher already exists");
  }
});

app.post("/shouldicrash", async (req, res) => {
  const crashers = deta.Base("crashers");
  let x = await crashers.get(req.body.name);
  console.log(x);
  res.send(x.value);
});

// export 'app'
module.exports = app;
app.listen(3000);
