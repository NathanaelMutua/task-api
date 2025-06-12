import express from "express";
import { tasks } from "./tasks.js";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send(`<body style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh"><h1>This is a simple Task API</h1><p>This project handles HTTP requests with endpoints.</p><hr><p>By Nash</p></body>`); // This will be displayed the moment we run the link
});

app.get("/tasks", async (req, res) => {
  try {
    const task = await prisma.task.findMany();
    res.status(200).json(task).send(`<h1>Fetched All Tasks</h1>`);
  } catch (e) {
    res.status(404).json("Something Went Wrong!").send(`<h1 style="text-align: center;">Something Went Wrong Bruv!</h1>`);
  }
});

app.post("/tasks", async(req, res) => {
    try{
        const {title, description} = req.body;
        const newTask = await prisma.task.create({
          data: {
            title,
            description
          }
        })
        res.status(201).json(newTask);
    } catch (e) {
        res.status(500).json({ message: "Something Went Wrong!"})
        console.log("We have an error!")
    }
})

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});
