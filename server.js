const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const path = require("path");
const merger = require("./testpdf");
const port = 4000 || process.env.PORT;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});
app.post("/merger", upload.array("pdfs", 2), async function (req, res, next) {
  console.log("hello");
  console.log(req.files);
  let d = await merger(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`${d}.pdf`);
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
