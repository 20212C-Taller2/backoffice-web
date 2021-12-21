import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { List } from "../utils/list"
import { 
  CourseListT, 
  Credentials, 
  User, 
  UserT, 
  UserListT, 
  VoidT, 
  CourseList, 
  Course, 
  CourseT, 
  ExamList, 
  ExamListT, 
  Exam,
  MetricList,
  MetricListT
} from "../utils/serialization"
import { State } from "../utils/state"
import { httpUser } from "./HttpUser"

export type AdminUser = {
  type: "admin"
  
  actions: AdminActions

  credentials: Credentials
}

type CourseDetail = {
  course: Course,
  creator: User,
  collaborators: List<User>
}

export type AdminActions = {

  logout: IO<void>

  registerAdmin: (args: { firstName: string, lastName: string, email: string, password: string }) => Async<void>

  getUsers: (args: { credentials: Credentials}) => Async<List<User>>

  getUser: (args: { credentials: Credentials, userId: string}) => Async<User>

  getCourses: (args: { credentials: Credentials}) => Async<CourseList>

  getCourse: (args: { credentials: Credentials, courseId: string}) => Async<CourseDetail>

  getExams: (args: { credentials: Credentials, courseId: string}) => Async<ExamList>

  getMetrics: (args: { credentials: Credentials, startDate?: string, endDate?: string}) => Async<MetricList>

  blockUnblockUser: (args: { credentials: Credentials, userId: string, block: boolean}) => Async<void>

}


export const buildAdminUser = (
  credentials: State<Credentials>,
  logout: IO<void>,
): AdminUser => {
  
  return {
    type: "admin",
  
    actions: {
      
      logout: logout,

      registerAdmin: registerAdminAsync,

      getUsers: getUsers,

      getUser: getUser,

      getCourses: getCourses,

      getCourse: getCourse,

      getExams: getExams,

      getMetrics: getMetrics,

      blockUnblockUser: blockUnblockUser
    },

    credentials: credentials.value
  }
}

export const registerAdminAsync = (
  args: { 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string 
  }
): Async<void> => async() => {

  const httpAdminUser = httpUser()

  const registerAdminBody = {
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email,
    password: args.password
  }

  await httpAdminUser.post(
    "https://ubademy-users-api.herokuapp.com/register/admin", 
    registerAdminBody,
    VoidT
  )()
}

export const getUsers = (
  args:{
    credentials: Credentials
  }
): Async<List<User>> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const userList = await httpAdminUser.get(
    "https://ubademy-users-api.herokuapp.com/users?skip=0&limit=999999999", 
    UserListT
  )()

  return userList.users
}

export const getUser = (
  args:{
    credentials: Credentials,
    userId: string
  }
): Async<User> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const user = await httpAdminUser.get(
    `https://ubademy-users-api.herokuapp.com/users/${args.userId}`, 
    UserT
  )()

  return user
}

export const blockUnblockUser = (
  args: { 
    credentials: Credentials, 
    userId: string, 
    block: boolean
  }
): Async<void> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)
  const adminOperation = args.block ? 
    httpAdminUser.post(
      `https://ubademy-users-api.herokuapp.com/users/${args.userId}/block`, 
      undefined,
      VoidT
    ) :
    httpAdminUser.delete(
      `https://ubademy-users-api.herokuapp.com/users/${args.userId}/block`, 
      VoidT
    )
  await adminOperation()
}

export const getCourse = (
  args:{
    credentials: Credentials
    courseId: string
  }
): Async<CourseDetail> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const fetchCourse = await httpAdminUser.get(
    `https://ubademy-courses-api.herokuapp.com/courses/${args.courseId}`, 
    CourseT,
  )()

  const fetchCreator = await httpAdminUser.get(
    `https://ubademy-users-api.herokuapp.com/users/${fetchCourse.creator}`, 
    UserT
  )()
  
  
  const fetchCollaborators = await Promise.all(
    fetchCourse.collaborators.map(it =>
      httpAdminUser.get(
        `https://ubademy-users-api.herokuapp.com/users/${it}`, 
        UserT
      )
  ).map(it => it()))

  const detailCourse: CourseDetail = {
    course: fetchCourse,
    creator: fetchCreator,
    collaborators: fetchCollaborators,
  }
  
  return detailCourse
}

export const getCourses = (
  args:{
    credentials: Credentials
  }
): Async<List<Course>> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const coursesList = await httpAdminUser.get(
    "https://ubademy-courses-api.herokuapp.com/courses?skip=0&limit=999999999", 
    CourseListT,
  )()

  return coursesList
}

export const getExams = (
  args:{
    credentials: Credentials
    courseId: string
  }
): Async<ExamList> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const examsList = await httpAdminUser.get(
    `https://ubademy-courses-api.herokuapp.com/courses/${args.courseId}/exams`, 
    ExamListT,
  )()

  return examsList
}

export const getMetrics = (
  args:{
    credentials: Credentials
    startDate?: string
    endDate?: string
  }
): Async<MetricList> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)
  const rangeDate = args.startDate !== undefined && args.endDate !== undefined ?
    `?start=${args.startDate}&end=${args.endDate}` : ""

  const examsList = await httpAdminUser.get(
    `https://ubademy-metrics-api.herokuapp.com/service/users${rangeDate}`, 
    MetricListT,
  )()

  return examsList
}