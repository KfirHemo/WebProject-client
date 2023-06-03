import { UserType } from "../data/types";

export const navData = [
    {
        userType: [UserType.Manager, UserType.Student, UserType.Teacher],
        text: "Home",
        link: "/"
    },
    {
        userType: [UserType.Manager],
        text: "Manage Users",
        link: "/users"
    },
    {
        userType: [UserType.Manager],
        text: "Manage Courses",
        link: "/courses"
    },
    {
        userType: [UserType.Teacher],
        text: "Show Courses",
        link: "/coursesTeacher"
    },
]