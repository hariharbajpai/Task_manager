import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};