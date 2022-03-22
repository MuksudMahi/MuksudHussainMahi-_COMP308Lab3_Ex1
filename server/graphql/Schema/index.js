let graphql = require("graphql");

module.exports = graphql.buildSchema(`
    type Student{
        _id: ID!
        studentNumber: String!
        firstName: String!
        lastName: String!
        address: String
        city: String
        phoneNumber: String
        program: String!
        email:String!
        courses: [Course]
        password: String!
    }
    type Course{
        _id: ID!
        courseCode: String!
        courseName: String!
        section: String!
        semester: String
        students: [Student]
    }
    input NewStudent{
        studentNumber: String!
        firstName: String!
        lastName: String!
        address: String
        city: String
        phoneNumber: String
        program: String!
        email:String!
        password: String!
    }
    type LoginReturnType{
        token:String  
        id:ID 
    }
    type RegisterReturnType{
        message:String   
    }
    type RootMutation{
        createStudent(newStudent:NewStudent):RegisterReturnType!
        login(studentNumber:String!,password:String!):LoginReturnType!
    }
    type RootQuery{
        students:[Student!]!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
