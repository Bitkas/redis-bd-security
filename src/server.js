const app = require("./index");
const { router: articles } = require("./services/articles");
const PORT = 3000;

app.use("/articles", articles)

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
