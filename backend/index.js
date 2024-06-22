const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post("/todo", async function (req, res) {
    const createPayLoad = req.body;
    const parsedPayload = createTodo.safeParse(createPayLoad);

    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Invalid inputs.",
        });
        return;
    }

    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false,
    });

    res.json({
        message: "Todo created.",
    });
});

app.get("/todos", async function (req, res) {
    const todos = await todo.find({});

    res.json({
        todos,
    });
});

app.put("/completed", async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Invalid inputs.",
        });
        return;
    }

    await todo.update(
        {
            _id: req.body.id,
        },
        {
            completed: true,
        }
    );

    res.json({
        message: "Todo updated.",
    });
});
