const { gql } = require('apollo-server-express');


module.exports = gql`
scalar Date


type Entry {
name: String!
path: String!
size: Int
extension: String
createdAt: String
isDirectory: Boolean!
mode: Int
permissions: String
uid: Int
gid: Int
}


type DirectoryListing {
entries: [Entry!]!
nextCursor: String
}


type Query {
directory(path: String!, cursor: String, limit: Int = 500): DirectoryListing!
}
`;