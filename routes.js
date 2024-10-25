const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// เส้นทางของไฟล์ user.json
const filePath = path.join(__dirname, 'asset', 'data', 'users.json');

// Route สำหรับแสดงหน้า home.ejs
router.get('/', (req, res) => {
  const successMessage = req.query.successMessage; // รับค่า successMessage จาก query string
  res.render('home', { successMessage });
});

// Route สำหรับแสดงหน้า form.ejs
router.get('/form', (req, res) => {
  res.render('form');
});

// Route สำหรับรับข้อมูลจากฟอร์มและบันทึกลงใน user.json
router.post('/submit-form', (req, res) => {
  const userData = req.body;

  // อ่านข้อมูลจากไฟล์ JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    let users = [];
    // ตรวจสอบว่ามีข้อมูลในไฟล์แล้วหรือไม่
    if (data) {
      users = JSON.parse(data);
    }

    // เพิ่มข้อมูลใหม่เข้าไปใน array
    users.push(userData);

    // เขียนข้อมูลกลับลงไปในไฟล์ JSON
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;

      // ส่งกลับไปที่หน้า home.ejs
      res.redirect('/?successMessage=บันทึกข้อมูลเสร็จสิ้น');
    });
  });
});

// Route สำหรับแสดงหน้า table.ejs
router.get('/table', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data || '[]');
    res.render('table', { users });
  });
});

// Route สำหรับแสดงหน้า edit.ejs
router.get('/edit/:index', (req, res) => {
  const userIndex = req.params.index;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data || '[]');
    const user = users[userIndex];

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('edit', { user, userIndex });
  });
});

// Route สำหรับอัปเดตข้อมูลผู้ใช้
router.post('/update/:index', (req, res) => {
  const userIndex = req.params.index;
  const updatedUser = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data || '[]');
    users[userIndex] = updatedUser; // อัปเดตข้อมูล

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      res.redirect('/table'); // เปลี่ยนเส้นทางไปยังหน้า table
    });
  });
});

// Route สำหรับลบผู้ใช้
router.post('/delete/:index', (req, res) => {
  const userIndex = req.params.index;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data || '[]');
    users.splice(userIndex, 1); // ลบผู้ใช้ที่เลือก

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      res.redirect('/table'); // เปลี่ยนเส้นทางไปยังหน้า table
    });
  });
});

module.exports = router;
