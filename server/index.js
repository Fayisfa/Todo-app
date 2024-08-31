const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middlware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create todo

app.post("/todos",async (req,res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) Values ($1) returning *",[description]);

        res.json(newTodo.rows[0]);  
    } catch (error) {
        console.error(err.message);
    }
    
});
//get all to do
app.get("/todos",async (req,res) => {
    try {
        const allTodos = await pool.query("SELECT * from todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(err.message);
    }
})

//get a todo
app.get("/todos/:id",async (req,res) =>{
    try {
        const { id } = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1",[id]);
        res.json(todo.rows);
    } catch (error) {
        console.error(err.message);
    }
})

//update todo

app.put("/todos/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2",[description,id]);
        res.json("To do updates");
    } catch (error) {
        console.error(err.message);
    }
})

//delete todo
app.delete("/todos/:id",async (req,res) =>{
    try {
        const { id } = req.params;
        const todo = await pool.query("delete from todo where todo_id = $1",[id]);
        res.json("todo was deleted!");
    } catch (error) {
        console.error(err.message);
    }
})




app.listen(5000, () =>{
    console.log("Server has started on port 5000");
});