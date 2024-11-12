import axios from "axios";
import { useState, useEffect } from "react";

var port = 5262; /*Porta para comunicação da API*/
var userId = localStorage.getItem("usuarioId")

function UserOptions() {

    function getUserData() {

        axios.get("http://localhost:" + port + "/usuarios/" + userId).then((response) => {
            document.getElementById("nome").placeholder = response.data.nome;
            document.getElementById("email").placeholder = response.data.email;
            document.getElementById("senha").placeholder = response.data.senha;
          });
    }

    function deletarUsuario() {
        // create delete user request
    }

    useEffect(() => {
        getUserData();
    }, []);

    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        senha: '',
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
        console.log(userData);
        const dadosUsuario = await axios.get("http://localhost:" + port + "/usuarios/" + userId)

        if(userData.nome === '') {
            userData.nome = dadosUsuario.data.nome;
        }
        if(userData.email === '') {
            userData.email = dadosUsuario.data.email;
        }
        if(userData.senha === '') {
            userData.senha = dadosUsuario.data.senha;
        }

        const response = await axios.put("http://localhost:" + port + "/usuarios/" + userId, userData)
        console.log(response.data.message)
        // create put to change user data
    };

    return(
        <>
            <div className="w-1/2 p-5 bg-very-light-purple flex flex-col items-center rounded-xl">
            <h2 className="w-1/2 text-xl text-purple font-bold pb-5">Alterações de Conta</h2>
            <form className="login-form w-full" onSubmit={handleLoginSubmit}>
                <label className="text-lg mb-1" htmlFor="nome">Username:</label>
                <input type="nome" id="nome" name="nome" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.nome} onChange={handleChange}/>
                
                <label className="text-lg mb-1" htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.email} onChange={handleChange}/>

                <label className="text-lg mb-1" htmlFor="senha">Password:</label>
                <input type="password" id="senha" name="senha" className="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2] text-black" value={userData.senha} onChange={handleChange}/>
                
                <button className="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Salvar Alterações</button>
            </form>
            <br />
            <button className="w-1/2 p-2 rounded-full bg-red-700 text-white font-bold cursor-pointer" onClick={deletarUsuario}>Excluir Conta</button>
            </div>

        </>
    )
}
export default UserOptions
