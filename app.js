const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const Blog = require('./models/blog');

//express app 
const app = express();

//connect to mongodb
const pass=process.env.USER_PASSWORD;
const dbURI = `mongodb+srv://user:${pass}@cluster0.g0bxgqf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))
//register view engine
app.set('view engine', 'ejs')


app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.use(morgan('dev'));

//middleware and static files

app.use(express.static('public'));

const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
app.get('/', (req,res)=>{
    res.render('index', {title:'Home', blogs});
})
app.get('/about', (req,res)=>{
   res.render('about',  {title:'About'})
})
//redirects
app.get('/about-us', (req,res)=>{
    res.redirect('/about')
})


app.get('/blogs/create', (req, res) => {
    res.render('create',  {title:'Create New Blog'});
  });

// 404 page
app.use((req,res)=>{
    res.status(404).render('404',  {title:'404'})
})