const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Render tasks page
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('tasks', { tasks });
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
});


// Add a new task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).send('Task title is required');
        }
        await Task.create({ title, description });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Error creating task');
    }
});

// Mark task as completed
router.get('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        if (!task.isCompleted) {
            task.isCompleted = true;
            await task.save();
        }
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Error updating task');
    }
});

// Route to display the edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.render('editTask', { task });
    } catch (error) {
        res.status(500).send('Error retrieving task');
    }
});

// Route to handle the form submission for editing
router.post('/:id/edit', async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.findByIdAndUpdate(req.params.id, { title, description });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Error updating task');
    }
});

// Delete task
router.get('/:id/delete', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send('Error deleting task');
    }
});

module.exports = router;
