import { useNavigate } from 'react-router-dom';
import './index.css';
import { useRef } from 'react';

function Login() {
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: nameRef.current.value, // Исправлено 'curent' на 'current'
      password: passwordRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User Not found!") { // Используйте строгое равенство '==='
          alert(data.message);
          return;
        }
        if (data.message === "Invalid Password!") {
          alert(data.message);
          return;
        }
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem('token', data.accessToken);
        }
      })
      .catch(err => {
        console.log(err);
      });
      navigate('/registr')
  }

  return (
    <div>
      <form className="form1" onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder='Enter your username' />
        <input ref={passwordRef} type="password" placeholder='Enter your password' />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;