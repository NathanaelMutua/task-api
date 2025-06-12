import express from "express";
import { tasks } from "./tasks.js";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send(`<body style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh"><h1>This is a simple Task API</h1><p>This project handles HTTP requests with endpoints.</p><hr><p>By Nash</p></body>`); // This will be displayed the moment we run the link
});

// this endpoint will have a function that will get all tasks from the database
app.get("/tasks", async (_req, res) => {
  try {
    const task = await prisma.task.findMany();
    res.status(200).json(task).send(`<h1>Fetched All Tasks</h1>`);
  } catch (e) {
    res.status(404).json("Something Went Wrong!").send(`<h1 style="text-align: center;">Something Went Wrong Bruv!</h1>`);
  }
});


// this function will add a post, I am using postman so the body input will be used to generate random values
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

// this endpoint will have a function that will get a specific task based on the ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const requestedTask = await prisma.task.findUnique({
      where: {
        id: id
      }
    });
    if (requestedTask) {
      res.status(200).json(requestedTask);
    } else {
      res.status(404).json({ message: "Task Was Not Found!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("We have an error!");
  }
});

// this endpoint will have a function to update a task
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const {title, description} = req.body || {};
  try {
    let updatedTask = await prisma.task.update({
      where: {
        id
      },
      data: {
        title: title && title,
        description: description && description
      }
    });
    res.status(200).json({ message:"Task Updated", updatedTask});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});
