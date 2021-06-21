const express=require("express");
const mongoose=require('mongoose');
const Article=require('./models/article')
const articleRouter=require('./routes/articles');
const methodOverride=require('method-override');
const app=express();


mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})


app.use(express.urlencoded({extended:false}));//this let assess for Article to get info 
app.use(methodOverride('_method'));
//Adding html pages
app.set('view engine','ejs')

app.get('/',async(req,res)=>{

    const articles=await Article.find().sort({createdAt:'desc'})
    //render method used to call html pages in views
    res.render('articles/index',{articles:articles});
})
Port=process.env.PORT||5000
app.use('/articles',articleRouter);
app.listen(Port,()=>{console.log(`Server is run in port ${Port}`)});