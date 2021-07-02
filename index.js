const express = require("express");

//database
const database= require("./database");

//intitalization
const booky = express();
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

booky.listen(5500, ()=>console.log("server is running"));