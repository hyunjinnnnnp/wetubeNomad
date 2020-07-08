//const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";  //default 로 export하지않았기때문에

const app = express();


const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req,res) => res.send('on profile');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));


app.get("/", handleHome);

app.get('/profile', handleProfile);
app.use('/user', userRouter); //누군가 /user 로 접근한다면 이 전체 라우터를 사용하겠다

export default app;