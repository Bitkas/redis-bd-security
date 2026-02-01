const express = require("express");
const { createConnection } = require("../utils/db")
const router = express.Router();

/**
 * Get Articles -> Basic Implementation: ~2s
 * Get Articles -> Basic Implementation w/ Docker: 2s 400ms
 */
router.get("/", async (req, res) => {
    const connection = await createConnection();
    const now = performance.now();
    const articles = await connection.query(`
    SELECT * FROM articles a
    `);

    const results = []
    for( const article of articles[0]) {
        const author = await connection.query(`SELECT email FROM users WHERE id = ${article.author_id}`);
        results.push( {
            author: author,
            articles: article.id
        })

    }
    res.json(results);
    const then = performance.now();
    console.log(`Time took for get all: ${(then - now).toFixed(2)}`)

})

/**
 * Get Article By Id -> Basic Implementation: ~2s
 * Get Article By Id -> Basic Implementation w/ Docker: ~6s
 */
router.get("/:id", async (req, res) => {
    const connection = await createConnection();
    const now = performance.now();
    const articleId = req.params.id;

    const article = await connection.query(`SELECT * FROM article WHERE id = ${articleId}`);

    const author = await connection.query(`SELECT email FROM users WHERE id = ${article.author_id}`);

    const result = {
        article,
        author: author.email
    }

    res.status(200).json(result);
    const then = performance.now();
    console.log(`Time took for get by id: ${(then - now).toFixed(2)}`)
    
})

/**
 * Update Article -> Basic Implementation: 10ms
 */
router.put("/:id", async (req, res) => {
    const connection = await createConnection();
    const now = performance.now();
    const { title, body } = req.body;

    const saved = await connection.query(`
        UPDATE articles
        SET title = "${title}", body = "${body}"
        WHERE id = ${req.params.id};
    `);

    res.status(200).json(saved);
    const then = performance.now();
    console.log(`Time took for update: ${(then - now).toFixed(2)}`)
})

/**
 * Delete Article -> Basic Implementation: 10ms
 */
router.delete("/:id", async (req, res) => {
    const connection = await createConnection();
    const now = performance.now();
    await connection.query(`DELETE FROM articles WHERE id=${req.params.id};`);

    res.status(204).end();
    const then = performance.now();
    console.log(`Time took for delete: ${(then - now).toFixed(2)}`)

})

/**
 * Create Article -> Basic Implementation: 10ms
 */
router.post("/", async (req, res) => {
    const connection = await createConnection();
    const now = performance.now();
    const { title, body } = req.body;

    const article = await connection.query(`
    INSERT INTO articles (title, body, author_id)
    VALUES ("${title}", "${body}", ${req.query.userId});`
    );

    res.status(201).json(article)
    const then = performance.now();
    console.log(`Time took for create: ${(then - now).toFixed(2)}`)
})

module.exports = { router };