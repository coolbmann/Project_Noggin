import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieparser());
app.use(bodyparser.json());

const server = http.createServer(app);

server.listen(8080)