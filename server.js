const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const admin = require("firebase-admin");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// تهيئة Firebase بطريقة آمنة تعمل محلياً وعلى Railway
let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // قراءة المفتاح من متغيرات البيئة على المنصة السحابية
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // قراءة الملف محلياً على جهازك أثناء التطوير
  serviceAccount = require("./serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// إعدادات البورت لتتوافق مع Railway تلقائياً
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
