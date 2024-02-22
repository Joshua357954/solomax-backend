import cors from 'cors';
import express, { Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface SendEmailRequest {
  to: string;
  subject: string;
  text: string;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
   
const MyEmail = 'website.solomax@gmail.com';

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MyEmail,
    pass: 'nynczivrprsbgxsh',
  },
});

app.post('/send-email', (req: Request<{}, {}, SendEmailRequest>, res: Response) => {
  const { to, subject, text } = req.body;

  const mailOptions: MailOptions = {
    from: MyEmail,
    to,
    subject,
    html: text,
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

app.get('/', (req: Request, res: Response) => {
  res.send('Solomax Server V1');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
