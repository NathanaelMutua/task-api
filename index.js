import express from 'express'
import { tasks } from './tasks';

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h2>A Simple Task API</h2>
        <p>This is a basic API created for Creating Reading Updating and Deleting tasks by Nash</p>
        <hr/>        
    `) // This will be displayed the moment we run the link
})

app.get("/tasks", (req, res) => {
    res.send(tasks);
})

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`My app is listening on port ${port}`);
})