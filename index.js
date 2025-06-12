import express from 'express'

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h1>Simple TASK API</h1>
        <p>This is a basic Api created for Creating Reading Updating and Deleting tasks</p>
        <hr/>        
    `) // Thi swill be displayed the moment we run the link
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`My app is listening on port ${port}`)
})