import { useRef } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Registr() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  function validate(name, email, password, rePassword) {
    if (name.current.value.length < 3) {
      alert("Username must be at least 3 characters long.");
      name.current.focus();
      name.current.style.outlineColor = 'red';
      return false;
    }
    if (email.current.value.length < 3) {
      alert("Email must be at least 3 characters long.");
      email.current.focus();
      email.current.style.outlineColor = 'red';
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Password must be at least 3 characters long.");
      password.current.focus();
      password.current.style.outlineColor = 'red';
      return false;
    }
    if (rePassword.current.value.length < 3) {
      alert("Confirm password must be at least 3 characters long.");
      rePassword.current.focus();
      rePassword.current.style.outlineColor = 'red';
      return false;
    }
    if (password.current.value !== rePassword.current.value) {
      alert("Passwords do not match.");
      rePassword.current.value = '';
      password.current.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validate(nameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) {
      return;
    }
    const user = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === "User registered successfully!") {
        navigate('/login');
      } else if (data.message === "Failed! Username is already in use!") {
        alert(data.message);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <form className="form1" onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="Enter your username" />
        <input ref={emailRef} type="email" placeholder="Enter your email" />
        <input ref={passwordRef} type="password" placeholder="Enter your password" />
        <input ref={rePasswordRef} type="password" placeholder="Confirm your password" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Registr;