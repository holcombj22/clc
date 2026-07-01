const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'registrations.json');

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

function loadRegistrations() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function saveRegistrations(registrations) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2));
}

function sanitizeText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

app.post(
  '/api/register',
  [
    body('firstName').trim().isLength({ min: 1, max: 80 }).withMessage('First name is required.'),
    body('lastName').trim().isLength({ min: 1, max: 80 }).withMessage('Last name is required.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required.'),
    body('phone').trim().isLength({ min: 10, max: 20 }).withMessage('A valid phone number is required.'),
    body('service').trim().isLength({ min: 1, max: 80 }).withMessage('Please select a service.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const registrations = loadRegistrations();
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      firstName: sanitizeText(req.body.firstName),
      lastName: sanitizeText(req.body.lastName),
      email: req.body.email.toLowerCase(),
      phone: sanitizeText(req.body.phone),
      address: sanitizeText(req.body.address || ''),
      city: sanitizeText(req.body.city || ''),
      zip: sanitizeText(req.body.zip || ''),
      service: sanitizeText(req.body.service),
      requests: sanitizeText(req.body.requests || ''),
      createdAt: new Date().toISOString(),
    };

    registrations.push(newEntry);
    saveRegistrations(registrations);

    res.status(201).json({ success: true, message: 'Registration saved securely.' });
  }
);

app.get('/api/registrations', (req, res) => {
  const registrations = loadRegistrations();
  res.json(registrations);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
