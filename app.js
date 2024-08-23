import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello world!"));

// Function to get the count of feedback from Deno KV
const getFeedbackCount = async (feedbackValue) => {
    const kv = await Deno.openKv();
    const res = await kv.get(["feedback", feedbackValue]);
    return res.value || 0;  // If no value is found, return 0
};

// Function to increment the count of feedback in Deno KV
const incrementFeedbackCount = async (feedbackValue) => {
    const kv = await Deno.openKv();
    const currentCount = await getFeedbackCount(feedbackValue);
    await kv.set(["feedback", feedbackValue], currentCount + 1);
};

// Route for getting feedback count
app.get("/feedbacks/:id", async (c) => {
    const feedbackValue = c.req.param("id");
    const count = await getFeedbackCount(feedbackValue);
    return c.text(`Feedback ${feedbackValue}: ${count}`);
});

// Route for incrementing feedback count
app.post("/feedbacks/:id", async (c) => {
    const feedbackValue = c.req.param("id");
    await incrementFeedbackCount(feedbackValue);
    const count = await getFeedbackCount(feedbackValue);
    return c.text(`Feedback ${feedbackValue} count updated to ${count}`);
});

export default app;
