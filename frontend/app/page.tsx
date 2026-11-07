"use client";

import {useState, useEffect} from "react";

const initialUsers = [
   {id: 1, name: "Aa",email: "Aa@gmail.com",role: "admin",status: "active"},
   {id: 2, name: "Bb",email: "Bb@gmail.com",role: "manager",status: "active"},
   {id: 3, name: "Cc",email: "Cc@gmail.com",role: "User",status: "active"},
];

export default function Home(){
   const [users, setUsers] = useState(initialUsers);
   const [activePage, setActivePage] = useState("Dashboard");
   const [backendMessage, setBackendMessage] = useState("Connecting...");
   useEffect(() => {
     fetch("/api/hello")
       .then(response => {
         if (!response.ok) {
           throw new Error("Backend API failed");
         }
         return response.text();
       })
       .then(data => setBackendMessage(data))
       .catch(error => {
         console.error(error);
         setBackendMessage("Backend connection failed");
       });
   }, []);

   function addUser() {
    const id = Date.now();
    setUsers([...users, {
      id,
      name: `New User ${users.length + 1}`,
      email: `user${users.length + 1}@gmail.com`,
      role: "User",
      status: "Active",
    }]);
  }
   
     const activeUsers = users.filter(u => u.status === "Active").length;

     return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="brand">Admin<span>Panel</span></h2>
        <p className="menu-label">MAIN MENU</p>

        {["Dashboard", "Users", "Analytics", "Reports", "Settings"].map(item => (
          <button
            key={item}
            className={`nav-item ${activePage === item ? "selected" : ""}`}
            onClick={() => setActivePage(item)}
          >
            {item}
          </button>
        ))}

        <div className="sidebar-footer">Admin Management v1.0</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>{activePage}</h2>
            <p>Welcome back, Administrator!</p>
            <p>Backend Status: {backendMessage}</p>
          </div>
          <div className="profile">AD</div>
        </header>

        {activePage === "Dashboard" && (
          <>
            <h3 className="section-title">Overview</h3>

            <section className="stats-grid">
              <div className="stat-card">
                <p>Total Users</p>
                <h2>{users.length}</h2>
                <span>Registered users</span>
              </div>
              <div className="stat-card">
                <p>Active Users</p>
                <h2>{activeUsers}</h2>
                <span>Currently active</span>
              </div>
              <div className="stat-card">
                <p>Inactive Users</p>
                <h2>{users.length - activeUsers}</h2>
                <span>Currently inactive</span>
              </div>
              <div className="stat-card">
                <p>System Status</p>
                <h2 className="healthy">Healthy</h2>
                <span>Application running</span>
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Recent Users</h3>
                  <p>Manage your registered users</p>
                </div>
                <button className="primary-btn" onClick={addUser}>
                  + Add User
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`status ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activePage === "Users" && (
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h3>User Management</h3>
                <p>Manage application users</p>
              </div>
              <button className="primary-btn" onClick={addUser}>+ Add User</button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage !== "Dashboard" && activePage !== "Users" && (
          <section className="panel">
            <h3>{activePage}</h3>
            <p>This module is under development.</p>
          </section>
        )}
      </main>
    </div>
  );
}
