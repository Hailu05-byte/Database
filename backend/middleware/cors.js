import express from 'express';
import cors from 'cors'; 

const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};


app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('CORS is working correctly!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

