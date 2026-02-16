import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  // OPTIONAL: if profile API fails, still show fallback name
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setUser(null); // force fallback
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setUser(null); // fallback
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
      fetchProfile();
    }
  }, []);

  const addTask = async () => {
    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* ✅ IF user exists show real name, ELSE show Guest */}
      <h3>
        Welcome: {user ? user.name : "Guest User"}
      </h3>

      <button onClick={logout} style={{backgroundColor:"red"}}>Logout</button>

      <input
        placeholder="Search task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <input
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
