// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // 맨 위에 필요함
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB 연결 성공"))
  .catch(err => console.error("❌ MongoDB 연결 실패", err));

// 스키마 정의
const UserSchema = new mongoose.Schema({
  q1: [String],
  q2: [String],
  q3: [String],
  q4: [String],
  q5: [String],
  q6: [String],
  name: String,
  branch: [String],
  phone: String,
  agreeRequired: Boolean,
  agreeOptional: Boolean,
  createdAt: Date
});

const User = mongoose.model('User', UserSchema);

// POST: 사용자 데이터 저장
app.post('/api/users', async (req, res) => {
  console.log("✅ POST 요청 도착");
  console.log("body:", req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "저장 완료" });
  } catch (err) {
    res.status(500).json({ error: "DB 저장 오류" });
  }
});

// GET: 관리자페이지에서 불러오기
app.get('/api/users', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

// DELETE: 사용자 삭제
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: '삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '삭제 실패' });
  }
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
