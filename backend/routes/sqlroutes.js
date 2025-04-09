const express = require('express');
const { body, param, validationResult } = require('express-validator');
const pool = require('../database/sqlDatabase');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};



router.post('/users',
    [
        body('name').isString().notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ],
    validateRequest,
    async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password]
            );
            res.status(201).json({ id: result.insertId, name, email });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const [rows] = await pool.query(
          'SELECT * FROM users WHERE email = ?',
          [email]
      );

      if (rows.length === 0) {
          return res.status(400).json({ message: 'User not found' });
      }

      const user = rows[0];

      if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      res.cookie('username', user.name, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'Lax',
        secure: false 
      });

      res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email FROM users');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/logout', (req, res) => {
  res.clearCookie('username', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false 
  });
  res.json({ message: 'Logged out successfully' });
});


router.post("/foods",
    [
      body('name').isString().notEmpty(),
      body('ingredients').isArray().notEmpty(),
      body('cuisine').isString().notEmpty(),
      body('meal_type').isString().notEmpty(),
      body('created_by').isInt()
    ],
    validateRequest,
    async (req, res) => {
      const { name, ingredients, cuisine, meal_type, created_by } = req.body;
      try {
        // Check if user exists
        const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [created_by]);
        if (userRows.length === 0) return res.status(400).json({ message: "User not found" });
  
        const ingredientsJSON = JSON.stringify(ingredients);
  
        const [result] = await pool.query(
          'INSERT INTO food_combinations (name, ingredients, cuisine, meal_type, created_by) VALUES (?, ?, ?, ?, ?)',
          [name, ingredientsJSON, cuisine, meal_type, created_by]
        );
  
        res.status(201).json({ id: result.insertId, name, ingredients, cuisine, meal_type, created_by });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating food" });
      }
    }
  );
  

  router.get("/foods", async (req, res) => {
    const { created_by } = req.query;
  
    try {
      let query = `
        SELECT f.*, u.name AS creator_name, u.email AS creator_email
        FROM food_combinations f
        JOIN users u ON f.created_by = u.id
      `;
      const values = [];
  
      // Filter by user if provided
      if (created_by) {
        query += " WHERE f.created_by = ?";
        values.push(created_by);
      }
  
      const [foods] = await pool.query(query, values);
  
      // Safely parse ingredients
      const formattedFoods = foods.map(f => ({
        ...f,
        ingredients: (() => {
          try {
            return JSON.parse(f.ingredients);
          } catch (e) {
            return [];
          }
        })(),
        created_by: {
          name: f.creator_name,
          email: f.creator_email
        }
      }));
  
      res.status(200).json(formattedFoods);
    } catch (err) {
      console.error("Error fetching food combinations", err);
      res.status(500).json({ message: "Error fetching food combinations" });
    }
  });
  
  

router.put("/foods/:id",
    [
        param('id').isInt({ min: 1 }),
        body('name').optional().isString().notEmpty(),
        body('ingredients').optional().isArray(),
        body('cuisine').optional().isString().notEmpty(),
        body('meal_type').optional().isString().notEmpty()
    ],
    validateRequest,
    async (req, res) => {
        const foodId = req.params.id;
        const updates = req.body;
        try {
            const fields = [];
            const values = [];

            for (let [key, value] of Object.entries(updates)) {
                if (key === 'ingredients') value = JSON.stringify(value);
                fields.push(`${key} = ?`);
                values.push(value);
            }

            values.push(foodId);
            const query = `UPDATE food_combinations SET ${fields.join(', ')} WHERE id = ?`;

            const [result] = await pool.query(query, values);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Food not found" });

            res.status(200).json({ message: "Food updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error updating food" });
        }
    }
);

router.delete("/foods/:id",
    [param('id').isInt({ min: 1 })],
    validateRequest,
    async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM food_combinations WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Food not found" });

            res.status(200).json({ message: "Food deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting food" });
        }
    }
);

module.exports = router;
