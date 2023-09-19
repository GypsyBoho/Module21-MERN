const typeDefs = `
type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}
type Auth {
    token: ID!
    user: User
}
input BookData {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: User
}
type Mutation {
    addUser(username:String!, email:String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookData!): User
    deleteBook(bookId: ID!): User 
   }
`;
module.exports = typeDefs;


   