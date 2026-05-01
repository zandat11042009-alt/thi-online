const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "data.json";

// đọc dữ liệu
function readData() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// ghi dữ liệu
function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// 🔥 API thêm câu hỏi
app.post("/add", (req, res) => {
  let data = readData();
  data.push(req.body);
  writeData(data);
  res.send({ status: "ok" });
});

// 🔥 API lấy đề
app.get("/questions", (req, res) => {
  res.json(readData());
});

// 🔥 API nộp bài
app.post("/submit", (req, res) => {
  let answers = req.body.answers;
  let questions = readData();

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] == q.correct) score++;
  });

  res.json({
    score: score,
    total: questions.length
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server chạy cổng " + PORT));
