const express = require('express')
const router = express.Router()

const { getData, saveData } = require('./handlers/jsonhandler')
let articles = getData()

//Returning Home page
router.get('/', (_, res) => {
    res.render('index')
})

//Fetching all Articles
router.get('/articles', (_, res) => {
    res.render('articles', {
        articles: articles
    })
})

//Fetching specific article (GET Article by id)
router.get('/articles/article/:id', (req, res) => {
    let queryID = req.params['id']
    const article = articles.find(function(article) {
        if (article.id === queryID) {
            return true
        }
    }) 
    if (!article) {
        res.render('not-found')
    }
    else {
        res.render('single-article', {
            article: article
        })
    }
})

//Opening add article form
router.get('/articles/add-new-article', (req, res) => {
    res.render('new-article')
})

//Logic for saving article
router.post('/add-new', (req, res) => {
    articleBody = req.body

    if (req.body) {
        let currentDate = new Date()
        let newArticle = {}
        newArticle.id = randstrID("wiut-web-technology-blog-app")
        newArticle.title = articleBody.title
        newArticle.introduction = articleBody.introduction
        newArticle.text = articleBody.text
        newArticle.conclusion = articleBody.conclusion
        newArticle.link = articleBody.link
        newArticle.author = articleBody.author
        newArticle.topic = articleBody.topic
        newArticle.created_at = (currentDate.toISOString().split('T')[0]).toString()
        articles.push(newArticle)
        saveData(articles)
        res.redirect('/')
    }else {
        res.render('oops') 
    }
})

//Opening edit form with selected article
router.get('/articles/edit-existing-article/:id', (req, res) => {
    let queryID = req.params['id']
    if (!queryID) {
      res.render('oops');
    }
    const article = articles.find(article => article.id === queryID) 
    if (!article) {
        res.render('error')
    }
    else { 
        res.render('edit-form', {
            article: article,
        })
    }
})

//Logic for editing an article
router.post('/articles/edit-article/:id', (req, res) => {
    let queryID = req.params['id']
    if (!queryID) {
        res.render('oops');
      }else {
        const updateArticle = req.body
        for (let i=0; i<articles.length; i++) {
            if(articles[i].id == queryID) {
                articles[i].title = updateArticle.title ? updateArticle.title: student.title
                articles[i].introduction = updateArticle.introduction ? updateArticle.introduction: student.introduction
                articles[i].text = updateArticle.text ? updateArticle.text: student.text
                articles[i].link = updateArticle.link ? updateArticle.link : student.link
                articles[i].author = updateArticle.author ? updateArticle.author : student.author
                articles[i].conclusion = updateArticle.conclusion ? updateArticle.conclusion : student.conclusion
                articles[i].topic = updateArticle.topic ? updateArticle.topic : student.topic
                saveData(articles)
                res.render('single-article', {
                    article: articles[i]
                })
            }
        }   
    }
})

//Removing article
router.post('/articles/remove-article/:id', (req, res) => {
    let queryID = req.params.id
    if(queryID) {
        for (let i=0; i<articles.length; i++) {
            if (articles[i].id == queryID) {
                articles.splice(i, 1)
                saveData(articles)
                res.render('articles', {articles:articles})
            }
        }
    }
})


//function to generate prefixed unique id
function randstrID(prefix)
{
    return Math.random().toString(36).replace('0.',prefix || '');
}

module.exports = router
