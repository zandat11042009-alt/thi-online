const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let questions = []; // lưu tạm (RAM)

app.post("/add-question", (req, res) => {
    questions.push(req.body);
    res.json({ message: "Đã thêm câu hỏi" });
});

app.get("/questions", (req, res) => {
    res.json(questions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server chạy cổng " + PORT));
