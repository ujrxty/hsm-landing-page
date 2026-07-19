import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

// Database setup
const db = new Database(join(__dirname, 'database.sqlite'))

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    business_type TEXT,
    revenue TEXT,
    goal TEXT,
    challenge TEXT,
    investment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Create default admin if not exists
const adminExists = db.prepare('SELECT * FROM admins WHERE email = ?').get('admin@homeservicesmastery.com')
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO admins (email, password) VALUES (?, ?)').run('admin@homeservicesmastery.com', hashedPassword)
  console.log('Default admin created: admin@homeservicesmastery.com / admin123')
}

// Middleware
app.use(cors())
app.use(express.json())

// Email transporter setup (configure with your SMTP settings)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// Routes

// Submit application
app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, phone, business_type, revenue, goal, challenge, investment } = req.body

    const stmt = db.prepare(`
      INSERT INTO applications (name, email, phone, business_type, revenue, goal, challenge, investment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(name, email, phone, business_type, revenue, goal, challenge, investment)

    // Send email notification
    if (process.env.SMTP_USER && process.env.NOTIFICATION_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Application: ${name} - ${business_type}`,
          html: `
            <h2>New Application Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Business Type:</strong> ${business_type}</p>
            <p><strong>Current Revenue:</strong> ${revenue}</p>
            <p><strong>Revenue Goal:</strong> ${goal}</p>
            <p><strong>Biggest Challenge:</strong> ${challenge}</p>
            <p><strong>Investment Ready:</strong> ${investment}</p>
            <hr>
            <p>View all applications at: <a href="${process.env.APP_URL || 'http://localhost:5173'}/admin">Admin Dashboard</a></p>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
      }
    }

    res.json({ success: true, id: result.lastInsertRowid })
  } catch (error) {
    console.error('Error saving application:', error)
    res.status(500).json({ message: 'Failed to save application' })
  }
})

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body

  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email)
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isValid = bcrypt.compareSync(password, admin.password)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token })
})

// Get all applications (admin only)
app.get('/api/admin/applications', authMiddleware, (req, res) => {
  const applications = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all()
  res.json(applications)
})

// Delete application (admin only)
app.delete('/api/admin/applications/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM applications WHERE id = ?').run(id)
  res.json({ success: true })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Admin login: admin@homeservicesmastery.com / admin123`)
})
