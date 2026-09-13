const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const admin = require("firebase-admin");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// قراءة إعدادات الفايربيس بطريقة آمنة تماماً تمنع خطأ ENOENT
if (process.env.FIREBASE_CONFIG) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  // هذا يعمل محلياً فقط على جهازك إذا وضعت الملف بجانبه
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// مسار تجريبي للاختبار
app.get('/', (req, res) => {
  res.send('School PWA Server is running successfully!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
