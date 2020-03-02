const fs=require('fs')
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
let aboutMessage = "Product List API v1.0";
const productDB = [
  {
    id: 1,category:'Shirts',name:"Champion Men's Classic Jersey Script T-Shirt",price:13.03,image:'https://www.amazon.com/Champion-Classic-Jersey-Script-T-Shirt/dp/B07DJBPCG4/ref=sr_1_4?dchild=1&fst=as%3Aoff&qid=1583022337&refinements=p_n_size_browse-vebin%3A2343350011&rnid=2343347011&s=apparel&sr=1-4&th=1&psc=1'
  },
  {
    id: 2,category:'Jeans',name:"Levi's Men's 505 Regular Fit Jeans",price:33.70,image:'https://www.amazon.com/Levis-Mens-505-Regular-Jeans/dp/B0851V9F66?ref_=BSellerC&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90&pf_rd_s=merchandised-search-11&pf_rd_t=101&pf_rd_i=1045564&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90'
  }
];
const resolvers = {
  Query: {
    about: () => aboutMessage,
    productList,
  },
  Mutation: {
    setAboutMessage,
    productAdd
  },
};
function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}
function productList() {
  return productDB;
}
function productAdd(_, { product })
{
  product.id = productDB.length + 1;
  productDB.push(product);
  return product;
}
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});
const app = express();
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
  console.log('App started on port 3000');
});