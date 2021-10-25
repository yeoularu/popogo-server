const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.post("/", (req, res) => {
  const request = require("request");
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";

  const query = req.body.text;

  var options = {
    url: api_url,
    form: { source: "en", target: "ko", text: query },
    headers: {
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
