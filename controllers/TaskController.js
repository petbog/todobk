import TasksModel from "../models/Tasks.js";

export const create = async (req, res) => {
    try {
        const doc = new TasksModel({
            name: req.body.name,
            tasks: req.body.tasks,
            date: req.body.date,
            deadline: req.body.deadline,
        })
        const todo = await doc.save();
        res.json(todo);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Todo not create" })
    }
}
export const getTasks = async (req, res) => {

    try {
        const { searchTerm } = req.query;
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                ]
            }
        }

        const todos = await TasksModel.find(query)
            .sort({ createdAt: 'desc' })
            .exec();
        const newTasks = todos
            .filter(task => !task.overdue && task.tasks)
            .filter(task => task.tasks.some(task => task.checked === false));
        res.json(newTasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Todo not find" })
    }
}
export const getTasksСompleted = async (req, res) => {
    try {
        const todos = await TasksModel.find()
            .sort({ createdAt: 'desc' })
            .exec();
        const complitedTasks = todos
            .filter(task => !task.overdue && task.tasks)
            .filter(task => task.tasks.every(task => task.checked === true));
        res.json(complitedTasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Todo not find" })
    }
}
export const remove = async (req, res) => {
    try {
        const todoId = req.params.id;
        const doc = await TasksModel.findByIdAndDelete({ _id: todoId });
        if (!doc) { res.status(500).json({ message: "Todo not delete" }) }
        res.json({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "todo not delete" })
    }
}
export const checked = async (req, res) => {
    try {
        const todoId = req.params.id;
        await TasksModel.updateOne(
            { _id: todoId },
            {
                tasks: req.body.files
            }
        );
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить задачи" });
    }
};
export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        await TasksModel.updateOne(
            { _id: todoId },
            {
                name: req.body.name,
                tasks: req.body.tasks,
                date: req.body.date,
                deadline: req.body.deadline,
            }
        );
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить задачи" });
    }
};
export const removeTask = async (req, res) => {
    try {
        const todoId = req.params.id;
        console.log(req.body.files)
        await TasksModel.updateOne(
            { _id: todoId },
            {
                tasks: req.body.files
            }
        );
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось удалить задачу" });
    }
};