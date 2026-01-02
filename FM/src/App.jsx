import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Authentication/Login.jsx"
import Register from "./pages/Authentication/Register.jsx"
import Reset from "./pages/Authentication/Reset.jsx"
import Dashboard from "./pages/Main/Dashboard.jsx"
import Transaction from "./pages/Main/Transaction.jsx"
// import Calender from "./pages/Main/Calender.jsx"
// import Categories from "./pages/Main/Categories.jsx"
import Group from "./pages/Main/Group.jsx"
// import Reminder from "./pages/Main/Reminder.jsx"
// import Setting from "./pages/Main/Setting.jsx"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/group" element={<Group />} />
          {/*
          <Route path="/calender" element={<Calender />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/setting" element={<Setting />} /> */}
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
