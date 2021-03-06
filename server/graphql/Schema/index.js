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
        courses: [Courses]
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
    type Courses{
        _id:Course
        section:String
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
    input NewCourse{
        courseCode:String!
        courseName:String!
        section:String
        semester:String
    }
    type LoginReturnType{
        token:String  
        id:ID 
    }
    type MessageReturn{
        message:String 
        status:String  
    }
    type CourseReturn{
        _id:[Courses],
        status:String!
    }
    type StudentReturn{
        students:[Student],
        status:String!
    }
    type RootMutation{
        createStudent(studentNumber: String!,firstName: String!,lastName: String!,address: String,city: String,phoneNumber: String,program: String!,email:String!,password: String!):MessageReturn!
        login(studentNumber:String!,password:String!):LoginReturnType!
        createCourse(courseCode: String!,courseName: String!,section: String,semester: String):MessageReturn!
        deleteCourse(courseId:String!, studentId:String!):MessageReturn!
        enrollCourse(studentId: String!, courseId:String!):MessageReturn!
        dropCourse(studentId: String!, courseId:String!):MessageReturn!
        updateCourse(studentId: String!, courseId:String!, section:String!):MessageReturn!
    }
    type RootQuery{
        student(studentId:String!):Student!
        getStudentCourses(id:String!): Student!
        getStudentList:StudentReturn
        showEnrolledStudents(id:String!):Course
        showCourseList:[Course]
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);
