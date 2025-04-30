import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
    status: 200,
    data: {
      name: "John Doe",
      age: 20,
      email: "john.doe@example.com",
    },
  });
});
