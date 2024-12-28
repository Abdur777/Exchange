import express from "express"
import { orderRouter } from "./routes/order";
import { depthRouter } from "./routes/depth";
import { tradesRouter } from "./routes/trades";

const app = express();
app.use(express.json());

app.use("/api/v1/order",orderRouter);
app.use("api/v1/depth",depthRouter);
app.use("api/v1/trades",tradesRouter)

app.listen(3000,()=>{
    console.log("listing at port 3000");
})