const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "questions.json";

// lấy đề
app.get("/api/questions", (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// thêm câu hỏi
app.post("/api/questions", (req, res) => {
  let data = [];
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE));
  }

  data.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Đã lưu câu hỏi" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server chạy cổng " + PORT));
