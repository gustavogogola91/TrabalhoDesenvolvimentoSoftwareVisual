import axios from "axios";
import { useState, useEffect } from "react";

var port = 5262; /*Porta para comunicação da API*/
var userId = localStorage.getItem("usuarioId")

function UserOptions() {

    function getUserData() {

        axios.get("http://localhost:" + port + "/usuarios/" + userId).then((response) => {
            document.getElementById("username").placeholder = response.data.nome;
            document.getElementById("email").placeholder = response.data.email;
            document.getElementById("password").placeholder = response.data.senha;
          });
    }

    function deletarUsuario() {
        // create delete user request
    }

    useEffect(() => {
        getUserData();
    }, []);

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // create put to change user data
    };

    return(
        <>
            <div className="w-1/2 p-5 bg-very-light-purple flex flex-col items-center rounded-xl">
            <h2 className="w-1/2 text-xl text-purple font-bold pb-5">Alterações de Conta</h2>
            <form className="login-form w-full" onSubmit={handleLoginSubmit}>
                <label className="text-lg mb-1" htmlFor="username">Username:</label>
                <input type="username" id="username" name="username" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.username} onChange={handleChange}/>
                
                <label className="text-lg mb-1" htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.email} onChange={handleChange}/>

                <label className="text-lg mb-1" htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.password} onChange={handleChange}/>
                
                <button className="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Salvar Alterações</button>
            </form>
            <br />
            <button className="w-1/2 p-2 rounded-full bg-red-700 text-white font-bold cursor-pointer" onClick={deletarUsuario}>Excluir Conta</button>
            </div>

        </>
    )
}
export default UserOptions
