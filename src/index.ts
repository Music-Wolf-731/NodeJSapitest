import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

// 創建 Express 應用
const app = express();

// 配置 CORS 中間件，允許跨域請求並允許發送憑據
app.use(cors({
    credentials: true,
}))

// 配置其他中間件
app.use(compression());     // 壓縮響應
app.use(cookieParser());    // 解析 Cookie
app.use(bodyParser.json())  // 解析 JSON 請求體

// 創建 HTTP 服務器
const server = http.createServer(app);


server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
})

const MONGO_URL = 'mongodb+srv://musicwolf731:ZXtmUqwQvpu1oNdR@cluster0.6d8iyrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => console.log(error))

// 處理成功連接提示，這部份教學中沒有
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB database');
});

app.use('/' , router());