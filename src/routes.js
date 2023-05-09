import {Navigate, createBrowserRouter,} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import JopDetails from "./pages/JopDetails/JopDetails";
import ManageJops from "./pages/ManageJops/ManageJops";
import AddJop from "./pages/ManageJops/AddJop";
import UpdateJop from "./pages/ManageJops/UpdateJop";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import AddUser from "./pages/ManageUsers/AddUser";
import UpdateApp from "./pages/ManageUsers/UpdateApp";
import ManageApp from "./pages/ManageUsers/ManageApp";
import AdminDashboard from "./pages/ApplicationRequests/AdminDashboard";
import History from "./pages/ApplicationRequests/History";



export const routes = createBrowserRouter([
    {
      path: '',
      element: <App/>,  
      children:[ 
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: ":id",
          element: <JopDetails/>,
        },
         // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
        
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/manage-jops",   
          element: <Admin />,
          children:[
            { 
              path:'',
              element:<ManageJops/>

            },
            { 
              path:"add",
              element: <AddJop />

            },
           
            {
              path: "update",
              element: <UpdateJop />,
            }
            
            
          
          ]
        },


        {
          path: "/manage-app",   
          element: <Admin />,
          children:[
            { 
              path:'',
              element:<ManageApp/>

            },
            { 
              path:"add",
              element: <AddUser />

            },
           
            {
              path: "update",
              element: <UpdateApp />,
            }
            
            
          
          ]
        },

        {
          path: "/AppReq",   
          element: <AdminDashboard />,
        },
        {
          path: "/history",   
          element: <History />,
        },


        {
          path:"*",
          element:<Navigate to={""}/>,
        },
      ]
      }
  ]);