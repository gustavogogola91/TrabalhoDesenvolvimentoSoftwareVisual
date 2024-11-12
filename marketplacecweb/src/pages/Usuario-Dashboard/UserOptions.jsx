import axios from "axios";
import { useState, useEffect } from "react";
import Endereco from "../Endereco";

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

    function deletarUsuario(){

        console.log("Deleta o usuario")
        localStorage.clear()
        axios.delete("http://localhost:" + port + "/usuarios/" + userId)
        console.log(userId)
        console.log(localStorage.getItem("usuarioId"))
        window.location.href = '/login'
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
        window.location.href = '/usuario'
    };

    return(
        <>
        <div className="w-full flex flex-col items-center gap-20">
            <div className="w-1/2 p-5 rounded-[3px] mb-6 bg-very-light-purple flex flex-col items-center">
            <h2 className="w-1/2 text-[25px] text-purple text-center font-bold pb-5">Alterações de Conta</h2>
            <form className="login-form w-full" onSubmit={handleLoginSubmit}>
                <label className="text-lg mb-1" htmlFor="nome">Username:</label>
                <input type="nome" id="nome" name="nome" className="w-full p-2 mb-2 rounded-[3px] border-none bg-[#D7CDE2] text-black" value={userData.nome} onChange={handleChange}/>
                
                <label className="text-lg mb-1" htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="w-full p-2 mb-2 rounded-[3px] border-none bg-[#D7CDE2] text-black" value={userData.email} onChange={handleChange}/>

                <label className="text-lg mb-1" htmlFor="senha">Password:</label>
                <input type="password" id="senha" name="senha" className="w-full p-2 mb-2 rounded-[3px] border-none bg-[#D7CDE2] text-black" value={userData.senha} onChange={handleChange}/>
                
                <button className="w-full p-2 shadow-md rounded-[3px] bg-purple text-white font-bold cursor-pointer">Salvar Alterações</button>
            </form>
            <br />
            <button className="w-1/2 p-2 shadow-md rounded-[3px] bg-red-700 text-white font-bold cursor-pointer" onClick={deletarUsuario}>Excluir Conta</button>
            </div>
        </div>
        <div>
            <Endereco/>
        </div>

        </>
    )
}
export default UserOptions
