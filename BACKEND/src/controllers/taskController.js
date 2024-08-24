const taskModel = require("../models/taskModel");


const getAllTasks = async (req, res) => {
    const { priority, status } = req.query;
    let filter = {}

    if (priority) filter.priority = priority
    if (status) filter.status = status

    try {
        const tasks = await taskModel.find(filter)
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//create new task

const createTask = async (req, res) => {
    const { title, description, priority } = req.body;

    try {
        
        const existingTask = await taskModel.findOne({ title });
        if (existingTask) {
            return res.status(409).json({ message: "Task with this title already exists" });
        }

        
        const newTask = new taskModel({ title, description, priority });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update existing task

const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, priority, status } = req.body

    try {
        const task = await taskModel.findById(id)
        if (!task) return res.status(404).json({ message: 'Task not found' })

        task.title = title || task.title
        task.description = description || task.description
        task.priority = priority || task.priority
        task.status = status || task.status

        await task.save()
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//delete task

const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const task = await taskModel.findByIdAndDelete(id)
        if (!task) return res.status(404).json({ message: "Task not found" })

        res.status(200).json({ message: "Task deleted sucessfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


module.exports = { getAllTasks, createTask, updateTask, deleteTask }