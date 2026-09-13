const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const admin = require('firebase-admin');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// تهيئة Firebase مع معالجة الرموز الخاصة في المفتاح الخاص
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG.replace(/\\n/g, '\n'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization error:", error.message);
}

const db = admin.firestore();

// مسار رئيسي للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('School PWA Server is up and running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
