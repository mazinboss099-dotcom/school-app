const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const admin = require('firebase-admin');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// قراءة مفتاح الفايربيس من متغيرات البيئة في Railway مباشرة
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase initialized successfully from environment variables.");
} catch (error) {
  console.error("Failed to initialize Firebase:", error.message);
}

const db = admin.firestore();

// مسار تجريبي للتأكد من عمل السيرفر
app.get('/', (req, res) => {
  res.send('School PWA Server is running and online!');
});

// تشغيل السيرفر على البورت المحدد من Railway أو البورت 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
