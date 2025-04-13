import Task from '../models/Task.js';
import ErrorResponse from '../utils/errorResponse.js';

// Helper function to emit real-time updates
const emitTaskUpdate = (io, userId) => {
  if (io) {
    io.to(`user_${userId}`).emit('task-updated');
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments({ user: req.user.id });
    const completed = await Task.countDocuments({ 
      user: req.user.id, 
      completed: true 
    });
    res.status(200).json({ 
      success: true, 
      data: {
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: total - completed
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const task = await Task.create(req.body);
    
    // Emit real-time update
    emitTaskUpdate(req.io, req.user.id);
    
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found`, 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`Not authorized`, 401));
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Emit real-time update
    emitTaskUpdate(req.io, req.user.id);
    
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found`, 404));
    }

    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`Not authorized`, 401));
    }

    await task.deleteOne();
    
    // Emit real-time update
    emitTaskUpdate(req.io, req.user.id);
    
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};