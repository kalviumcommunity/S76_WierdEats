const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Token not found' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
  