import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const handlePostUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data]
        setUsers(newUsers);
        form.reset();
      })
  };

  return (
    <div>
      <form onSubmit={handlePostUser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <input type="submit" value="Abb user" />
      </form>
      {users.map((user) => (
        <p key={user.id}>
          {user.id}: {user.name} : {user.email}
        </p>
      ))}
    </div>
  );
}
