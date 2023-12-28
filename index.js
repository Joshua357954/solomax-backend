const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());



const MyEmail = 'website.solomax@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: MyEmail,
    pass: "nynczivrprsbgxsh"
    // 'eyplajpzcnlbzorl',
  },
});



app.post('/send-email', (req, res) => {

  const {to,subject,text} = req.body

  const mailOptions = {
    from: MyEmail,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});  


app.get('/', (req,res) => {
    res.send("Solomax Server V1")
})

// localhost:3000/send-email/solomaxstudios@gmail.com/Welcome to Solomax/As we enter the new year brace up . MAX Renger ❤ 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
