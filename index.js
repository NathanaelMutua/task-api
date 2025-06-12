import express from "express";
import { tasks } from "./tasks.js";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send(`
        <h2>A Simple Task API</h2>
        <p>This is a basic API created for Creating Reading Updating and Deleting tasks by Nash</p>
        <hr/>        
    `); // This will be displayed the moment we run the link
});

app.get("/tasks", async (req, res) => {
  try {
    const task = await prisma.task.findMany();
    res.status(200).json(task);
  } catch (e) {
    res.send(`<h1 style="text-align: center;">Something Went Wrong Bruv!</h1>`);
    res.status(404).json("Something Went Wrong!");
  }
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});
