import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h2>A Simple Task API</h2>
        <p>This is a basic API created for Creating Reading Updating and Deleting tasks</p>
        <hr/>        
    `) // This will be displayed the moment we run the link
})

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`My app is listening on port ${port}`);
})