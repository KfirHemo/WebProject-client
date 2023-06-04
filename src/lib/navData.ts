import { UserType } from "../data/types";

export const navData = [
    {
        userType: [UserType.Manager, UserType.Student],
        text: "Home",
        link: "/"
    },
    {
        userType: [UserType.Teacher,],
        text: "Home",
        link: "/teacher"
    },
    {
        userType: [UserType.Manager, UserType.Teacher],
        text: "Manage Grades",
        link: "/grades"
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
]