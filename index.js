require("dotenv").config();

const express = require("express");

//database
const database= require("./database");

const mongoose= require("mongoose");


//intitalization
const booky = express();
booky.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("hey its running"));






//////GET/////

/*
Route:     /
Descrip:   get all books
access :   public
params :  none
methods:  get
*/

booky.get("/",(req,res) => {

return res.json({books: database.books})
});


/*
Route:     /
Descrip:   specific book
access :   public
params :  isbn
methods:  get
*/
booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook =database.books.filter((book)=>book.ISBN === req.params.isbn);

    if (getSpecificBook.length===0)

    {
        return res.json({error: `no book here ${req.params.isbn}`,});
    }
    return res.json({book:getSpecificBook});
})

/*
Route:     /c
Descrip:   specific book based on category
access :   public
params :  category
methods:  get
*/

booky.get("/c/:category",(req ,res)=>{
const getSpecificBook =database.books.filter((book)=>book.category.includes(req.params.category)
);

if (getSpecificBook.length===0){
    return res.json({error: `no category here ${req.params.category}`,});
}
return res.json({category: getSpecificBook})
});

/*
Route:     /l
Descrip:   list of language
access :   public
params :  languaage
methods:  get
*/
booky.get("/l/:language",(req,res)=>{
const getSpecificBook = database.books.filter((lang)=>lang.language.includes(req.params.language));

 if(getSpecificBook.length===0){
     return res.json({error:`not available lang ${req.params.language}`});

 };
 return res.json({lang: getSpecificBook});
});

//Author

/*
Route:     /a
Descrip:   list of authors
access :   public
params :  none
methods:  get
*/
booky.get("/a",(req,res)=>{
    return res.json({authors:database.author});
});

/*
Route:     /a
Descrip: specific author
access :   public
params :  id
methods:  get
*/


booky.get("/a/:id",(req, res)=>{
    const getAuthor=database.author.filter((author)=>author.id===parseInt(req.params.id));
   
    if (getAuthor.length===0){
        return res.json({error:`no author found ${req.params.id}`});
    };
   
    return res.json({author:getAuthor});
   });


/*
Route:     /a/book
Descrip: all author base on book
access :   public
params :  isbn
methods:  get
*/

booky.get("/a/book/:isbn",(req, res)=>{
 const getAuthor=database.author.filter((author)=>author.books.includes(req.params.isbn));

 if (getAuthor.length===0){
     return res.json({error:`no author found ${req.params.isbn}`});
 };

 return res.json({author:getAuthor});
});
 ///publication

/*
Route:     /p
Descrip: all publications
access :   public
params :  none
methods:  get
*/

booky.get("/p",(req, res)=>{
    return res.json({publications : database.publication});
});

/*
Route:     /p
Descrip:  specific publication
access :   public
params :  id
methods:  get
*/
booky.get("/p/:id",(req, res)=>{
   const getPublication=database.publication.filter((publication)=>publication.Id=== parseInt(req.params.id));
  if(getPublication.length===0)
   {
       return res.json({error:`no pub found ${req.params.id}`})
   };

    return res.json({publications : getPublication});
});


/*
Route:     /p/book
Descrip: all pub base on book
access :   public
params :  isbn
methods:  get
*/

booky.get("/p/books/:isbn",(req, res)=>{
    const getPublication=database.publication.filter((publication)=>publication.books.includes(req.params.isbn));
   
    if (getPublication.length===0){
        return res.json({error:`no author found ${req.params.isbn}`});
    };
   
    return res.json({books:getPublication});
   });


/////// POST///////


/*
Route:     /book/add
Descrip:  add new book
access :   public
params :  none
methods:  post
*/

booky.post("/book/add",(req, res)=>{
const {newBook} =req.body;
database.books.push(newBook);
return res.json({books:database.books});
});



/*
Route:     /author/add
Descrip:  add new author
access :   public
params :  none
methods:  post
*/

booky.post("/author/add",(req, res)=>{
    const {newAuthor} =req.body;
    database.author.push(newAuthor);
    return res.json({authors:database.author});
    });
    

/*
Route:     /pub/add
Descrip:  add new publication
access :   public
params :  none
methods:  post
*/

booky.post("/pub/add",(req, res)=>{
    const {newPub} =req.body;
    database.publication.push(newPub);
    return res.json({publications : database.publication});
    });
    
///PUT///
/*
Route:     /book/update/title
Descrip:  to udate new title
access :   public
params :  none
methods:  put
*/
booky.put("/book/update/title/:isbn",(req, res)=>{
database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
    };
   
});
return res.json({books:database.books});
});
    
///PUT///
/*
Route:     /book/update/author
Descrip:  update an new author
access :   public
params :  isbn
methods:  put
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN==req.params.isbn)
        {
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    database.author.forEach((author)=>{
        if (author.id ===parseInt(req.params.authorId));
    return author.books.push(req.params.isbn);
    });
    return res.json({books: database.books,author: database.author});
});
//////////////////new bookd update in publication/////////

//PUT///
/*
Route:     /publication/update/book
Descrip:  update / add new book for a publication 
access :   public
params :  isbn
methods:  put
*/
booky.put("/publication/update/book/:isbn",(req,res)=>{
    database.publication.forEach((publications)=>
    {

   if(publications.Id=== req.body.pubId){
   return publications.books.push(req.params.isbn);
    }
});
database.books.forEach((book)=>
{
    if (book.ISBN===req.params.isbn){
        book.publication=req.body.pubId;
        return;
    }
});

return res.json({books:database.books, pub:database.publication})
});

//////delete///////

/*
Route:     /book/delete
Descrip:   delete a book 
access :   public
params :  isbn
methods:  delete
*/
booky.delete("/book/delete/:isbn",(req,res)=>{

    const updatedBookDatabase = database.books.filter((book)=>{
        book.ISBN !== req.params.isbn

      
    });
    database.books = updatedBookDatabase;
    return res.json({book:database.books});
});

/*
Route:     /author/delete
Descrip:   delete a author 
access :   public
params :  isbn
methods:  delete
*/
booky.delete("/author/delete/:isbn/:authorId",(req,res)=>{

     database.books.forEach((book)=>{
         if(book.ISBN===req.params.isbn){
             const newAuthorList =database.author.filter
             ((authors)=> author!==parseInt(req.params.authorId) )
            }
            database.author= newAuthorList;
            return;
         });

         database.author.forEach((authors)=>
         {
             if (authors.id==parseInt(req.params.authorId)){
                    const newBookList=  authors.books.filter((book)=> book==req.params.isbn
                
                    )
                    author.book= newBookList;
                    return;

             }
           
         });
         return res.json({books:database.books,authors:database.author})

});




booky.listen(5500, ()=>console.log("server is running"));