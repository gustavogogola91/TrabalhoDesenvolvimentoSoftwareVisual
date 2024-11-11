import { useState } from 'react';
import axios from 'axios';
import logo from '../imgs/logo.png';

var port = 5262; /*Porta para comunicação da API*/

function Login() {
    return(
            <>
            <div className="flex justify-center items-center h-screen bg-gray"> {/*container*/}
                <div className="w-1/3 h-5/6 p-5 bg-light-purple flex flex-col items-center text-white rounded-3xl pt-[100px]"> {/*login-box*/}
                    <img src={logo} alt="logo" className="w-32 h-32 rounded-full"/>
                    <FormLogin/>
                </div>
                
                <div className="w-1/3 h-4/6 p-4 flex flex-col items-center justify-center bg-very-light-purple border-2 border-purple rounded-r-3xl border-l-0"> {/*register-box*/}
                    <FormRegister/>
                </div>
            </div>
            </>
    );
}

function FormLogin() {
    const [loginData, setLoginData] = useState({
        emailL: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Login Data:", loginData);
            const response = await axios.post('http://localhost:' + port + '/usuarios/login', loginData)


            if (response.data.usuario) {
                console.log(response.data.message)
                console.log("Bem vindo novamente " + response.data.usuario.nome)
                localStorage.setItem("usuarioId", response.data.usuario.id);
                console.log(localStorage.getItem("usuarioId"))
                window.location.href = '/produtos'
                return
            }

            console.log(response.data.message) /*mensagem do erro (sem cadastro ou senha invalida)*/

        }
        catch (error) {
            console.log('Erro ao conectar com o servidor');
        }
    };

    return (
        <>  
            <h2 className="mb-5 text-xl p-3">SignIn</h2>  
            <form className="login-form w-full" onSubmit={handleLoginSubmit}>
                <label className="text-lg mb-1" htmlFor="emailL">Email:</label>
                <input type="emailL" id="emailL" name="emailL" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={loginData.emailL} onChange={handleChange}/>
                
                <label className="text-lg mb-1" htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={loginData.password} onChange={handleChange}/>

                <a href="/home" className="self-end text-xs text-[#D7CDE2] mb-5">Forgot Password?</a>

                <button className="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Login</button>
            </form>
        </>
    );
}

function FormRegister() {
    const [registerData, setRegisterData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        if(registerData.nome === null || registerData.email === null || registerData.password === null || registerData.confirmPassword === null) {
            console.log("Preencha todos os campos")
            return
        }

        if(registerData.confirmPassword !== registerData.senha) {
            console.log("Senhas não conferem");
            return
        }

        const {confirmPassword, ...dataToSend } = registerData;

        try {
            console.log("Register Data:", registerData);
            const response = await axios.post('http://localhost:' + port + '/usuarios/register', registerData)

            if (response.data.message === "Ok") {
                console.log("Enviar dados para criar") // continuar cadastro
                console.log(dataToSend)
                await axios.post('http://localhost:' + port + '/usuarios/', dataToSend)
                console.log(localStorage.getItem("usuarioId"))
                window.location.href = '/produtos'
                return
            }

            console.log(response.data.message)

        }
        catch (error) {
            console.log('Erro ao conectar com o servidor');
        }
    };

    return (
        <>  
            <h2 className="mb-5 text-xl">SignUp</h2>
            <form className="signup-form w-full" onSubmit={handleRegisterSubmit}>
                <label htmlFor="nome" className="text-lg mb-1 text-black">Username:</label>
                <input type="text" id="nome" name="nome" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.nome} onChange={handleChange}/>

                <label htmlFor="email" className="text-lg mb-1 text-black">Email:</label>
                <input type="email" id="email" name="email" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.email} onChange={handleChange}/>

                <label htmlFor="confirm-password" className="text-lg mb-1 text-black">Password:</label>
                <input type="password" id="signup-password" name="senha"className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.senha} onChange={handleChange}/>

                <label htmlFor="confirm-password" className="text-lg mb-1 text-black">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirmPassword"className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={registerData.confirmPassword} onChange={handleChange}/>                        

                <button className="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Create Account</button>
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