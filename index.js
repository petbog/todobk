import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from 'cors'
import * as TaskController from './controllers/TaskController.js'




const app = express();
const PORT = '4444'
app.use(express.json());
app.use(cors());
config();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://todo-list-nu-drab.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

mongoose.connect(process.env.MONGODB_URL).then(
    console.log('DB OK')).catch(
        err => console.log('DB error', err));


app.listen(process.env.PORT || PORT, (err) => {
    if (err) { return console.log(err); }
    console.log('Server OK')
});


app.get('/', (req, res) => {
    res.send('hello world')
})



app.get('/todo', TaskController.getTasks);
app.get('/todo/completed', TaskController.getTasksСompleted);
app.post('/todo', TaskController.create)
app.patch('/todo/:id', TaskController.updateTodo);
app.patch('/todo/checked/:id', TaskController.checked);
app.patch('/todo/remove_task/:id', TaskController.removeTask);
app.delete('/todo/:id', TaskController.remove);



