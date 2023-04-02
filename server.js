require('express-async-errors');
require('dotenv').config();

const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();

const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}


const videoFileMap = {
  "james": "videos/james.mp4",
  "nf": "videos/nf.mp4",
  "sasha": "videos/sasha.mp4",
  "lukas": "videos/lukas.mp4"
};

app.get('/videos/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = videoFileMap[fileName];

  if (!filePath) {
    return res.status(404).send(`NO file path matches this ${filePath} path...`);
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": 'bytes',
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    }
    res.writeHead(200, head);
    fs.createReadStream(fileSize).pipe(res);
  }
})

app.use(express.static(path.join(__dirname, "/public")));
app.use(helmet());
app.use(xss());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./public","index.html"))
})

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();