import { useState } from 'react'
import logo from '../imgs/logo.png';

function Login() {
    return(
            <>
            <div class="flex justify-center items-center h-screen bg-gray"> {/*container*/}
                <div class="w-1/3 h-5/6 p-5 bg-light-purple flex flex-col items-center text-white rounded-3xl pt-[100px]"> {/*login-box*/}
                    <img src={logo} alt="logo" className="w-32 h-32 rounded-full"/>
                    <FormLogin/>
                </div>
                
                <div class="w-1/3 h-4/6 p-4 flex flex-col items-center justify-center bg-very-light-purple border-2 border-purple rounded-r-3xl border-l-0"> {/*register-box*/}
                    <FormRegister/>
                </div>
            </div>
            </>
    );
}

function FormLogin() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", loginData); // Aqui você pode enviar os dados do login para um backend ou autenticar.
    };

    return (
        <>  
            <h2 class="mb-5 text-xl p-3">SignIn</h2>  
            <form class="login-form w-full" onSubmit={handleLoginSubmit}>
                <label class="text-lg mb-1" for="username">Username:</label>
                <input type="email" id="username" name="username" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={loginData.username} onChange={handleChange}/>
                
                <label class="text-lg mb-1" for="password">Password:</label>
                <input type="password" id="password" name="password" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={loginData.password} onChange={handleChange}/>

                <a href="#" class="self-end text-xs text-[#D7CDE2] mb-5">Forgot Password?</a>

                <button class="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Login</button>
            </form>
        </>
    );
}

function FormRegister() {
    const [registerData, setRegisterData] = useState({
        signupUsername: '',
        email: '',
        signupPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Register Data:", registerData); // Aqui você pode enviar os dados de registro para um backend.
    };

    return (
        <>  
            <h2 class="mb-5 text-xl">SignUp</h2>
            <form class="signup-form w-full" onSubmit={handleRegisterSubmit}>
                <label for="signup-username" class="text-lg mb-1 text-black">Username:</label>
                <input type="text" id="signup-username" name="signupUsername" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.signupUsername} onChange={handleChange}/>

                <label for="email" class="text-lg mb-1 text-black">Email:</label>
                <input type="email" id="email" name="email" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.email} onChange={handleChange}/>

                <label for="confirm-password" class="text-lg mb-1 text-black">Password:</label>
                <input type="password" id="signup-password" name="signupPassword"class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.signupPassword} onChange={handleChange}/>

                <label for="confirm-password" class="text-lg mb-1 text-black">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirmPassword"class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.confirmPassword} onChange={handleChange}/>                        

                <button type="submit" class="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Create Account</button>
            </form>
        </>
    );
}

export default Login



// // localStorage
// localStorage.setItem("nome", "Valor do dado");

// // sessionStorage
// sessionStorage.setItem("nome", "Valor do dado");
// // localStorage
// const valor = localStorage.getItem("nome");

// // sessionStorage
// const valor = sessionStorage.getItem("nome");
// // localStorage
// localStorage.removeItem("nome");

// // sessionStorage
// sessionStorage.removeItem("nome");
// // localStorage
// localStorage.clear();

// // sessionStorage
// sessionStorage.clear();