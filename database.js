const books = [
    {
    ISBN: "12345Book",
    title:"Ananya",
    pub_date: "2021-07-22",
    language:"en",
    noPage:250,
    author:[1,2],
    publication:[1],
    category:["tech","programming","rk"]
   
}
];


const author =[
    {
        id :1,
        name :"kiran",
        books: ["12345Book"]
    },
    {
        id : 2,
        name: "yoga",
        books: ["123Book"]
       
    }
];


const publication = [
    {
       Id: 1,
       name: "tech max",
       books:["12345Book"]
    }
];

module.exports= {books,author,publication};