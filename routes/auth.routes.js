const { Router } = require('express');
const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Wrong password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong auth data',
        });
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email });

      if(candidate) {
        res.status(400).json({ message: 'User is exist'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword});

      await user.save();

      res.status(201).json({ message: 'User is created' });

    } catch (e) {
      res.status(500).json({ message: 'Something is going wrong...'});
    }
  }
);

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Enter valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong login data',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email});

      if(!user) {
        return res.status(400).json({message: 'User is not found'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ message: 'Password is wrong'});
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.json( {
        token, 
        userId: user.id,
      });
    } catch (e) {
      res.status(500).json({ message: 'Something is going wrong...'});
    }
  }
);

module.exports = router;
