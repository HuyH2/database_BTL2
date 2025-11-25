const express = require('express');
const cors = require('cors');
// 👇 Import các routes mới (bạn đã tạo file nhưng chưa dùng)
const authRouter = require('./routes/auth.routes');
const courseRouter = require('./routes/course.routes'); 
const itemsRouter = require('./routes/items.routes');
const dbRouter = require('./routes/db.routes');
const orgRouter = require('./routes/organization.routes');
const lessonRouter = require('./routes/lesson.routes');
const contentRouter = require('./routes/content.routes');
const forumRouter = require('./routes/forum.routes');
// const itemsRouter = require('./routes/items.routes'); // 🗑️ Xóa hoặc ẩn dòng này

const app = express();
app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => res.json({ ok: true }))

// 👇 Đăng ký đường dẫn chuẩn cho Frontend gọi
app.use('/api/auth', authRouter);      // Khớp với auth.js bên FE
app.use('/api/courses', courseRouter); // Khớp với courses.js bên FE
app.use('/api/items', itemsRouter);
app.use('/api/db', dbRouter);
app.use('/api/organization', orgRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/content', contentRouter);
app.use('/api/forum', forumRouter);

module.exports = app;