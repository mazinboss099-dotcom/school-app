const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'students.json';

app.post('/register', (req, res) => {
    const { name, email } = req.body;

    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.push({ name, email, date: new Date().toISOString() });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    console.log('تسجيل جديد محفوظ:', name, email);
    res.json({ message: 'تم استلام وحفظ التسجيل بنجاح!', name, email });
});

app.listen(PORT, () => {
    console.log(`السيرفر يشتغل على http://localhost:${PORT}`);
});