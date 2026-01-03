import { BrowserRouter, Routes, Route } from "react-router-dom"

// Authentication Pages
import Login from "./pages/Authentication/Login.jsx"
import Register from "./pages/Authentication/Register.jsx"
import Reset from "./pages/Authentication/Reset.jsx"
import Reset1 from "./pages/Authentication/Reset1.jsx"
// Main Pages
import Home from "./pages/Main/Home.jsx"
import Dashboard from "./pages/Main/Dashboard.jsx"
import Transaction from "./pages/Main/Transaction.jsx"
import Calender from "./pages/Main/Calender.jsx"
import Categories from "./pages/Main/Categories.jsx"
import Group from "./pages/Main/Group.jsx"
import Reminder from "./pages/Main/Reminder.jsx"
import Setting from "./pages/Main/Setting.jsx"

// Utility Pages
import PageNotFound from "./pages/Utility/PageNotFound.jsx"
import Loading from "./pages/Utility/Loading.jsx"
import Email from "./pages/Utility/Email.jsx"
import Error from "./pages/Utility/Error.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset1" element={<Reset1 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/group" element={<Group />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/email" element={<Email />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
