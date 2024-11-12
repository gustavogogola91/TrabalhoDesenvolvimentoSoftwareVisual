import axios from "axios";
import { useState, useEffect } from "react";

const IDCLIENTE = localStorage.getItem("usuarioId")

function Endereco() {
  const [endereco, setEndereco] = useState({
    idCliente: IDCLIENTE,
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  }
  );
  const [enderecos, setEnderecos] = useState([]);

  async function salvarEndereco(endereco) {
    try {
      if (endereco.id != null) {
        await axios.put(
          `http://localhost:5262/enderecos/${endereco.id}`,
          endereco
        );
      } else {
        await axios.post(`http://localhost:5262/enderecos/`, endereco);
      }
      setEndereco({
        idCliente: IDCLIENTE,
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      });
      alert("Endereço salvo com sucesso!");
      listarEnderecos();
    } catch (error) {
      alert("Erro ao salvar o endereço. Tente novamente.");
      console.error(error);
    }
  }
  function cancelar() {
    setEndereco({
      idCliente: IDCLIENTE,
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    });
  }
  function listarEnderecos() {
    axios.get(`http://localhost:5262/enderecos/cliente/${IDCLIENTE}`).then((resposta) => {
      setEnderecos(resposta.data);
    });
  }
  function excluirEndereco(endereco) {
    try {
      axios
        .delete(`http://localhost:5262/enderecos/${endereco.id}`)
        .then(() => listarEnderecos());
      alert("Endereço excluído com sucesso");
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  function EditarComp() {
    

    return(
      Formulario()
    )
  }

  function editarEndereco(endereco) {

    setEndereco({
      id: endereco.id,
      idCliente: endereco.idCliente,
      rua: endereco.rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
    });
  }
  function adicionarEndereco() {
    setEndereco({
      idCliente: IDCLIENTE,
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    });
  }
  function onChangeEndereco(campo, valor) {
    setEndereco((endereco) => ({
      ...endereco,
      [campo]: valor,
    }));
  }
  useEffect(() => {
    listarEnderecos();
  }, []);
  function Lista(enderecos) {
    return (
      <table className="m-auto table-auto bg-white">
        <thead className="text-[18px]">
          <tr>
            <th className="border-b w-16 h-16 p-2 text-center">ID</th>
            <th className="border-b w-32 text-center">Id Cliente</th>
            <th className="border-b w-48 text-center">Rua</th>
            <th className="border-b w-16 text-center">Número</th>
            <th className="border-b w-48 text-center">Complemento</th>
            <th className="border-b w-48 text-center">Bairro</th>
            <th className="border-b w-48 text-center">Cidade</th>
            <th className="border-b w-[3px] text-center">Estado</th>
            <th className="border-b w-32 text-center">CEP</th>
            <th className="border-b w-48 text-center">Ações</th>
            <th className="border-b w-48 text-center">
              <button
                className="border border-black rounded-xl p-2"
                onClick={editarEndereco}>
                Adicionar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{Linhas(enderecos)}</tbody>
      </table>
    );
  }
  function Formulario() {
    return (
      <form className="m-auto h-auto flex flex-col gap-4 w-96 bg-very-light-purple p-4 rounded-[3px] mb-24 text-center">
        
        <label htmlFor="rua">Rua</label>
        <input
          type="text"
          id="rua"
          name="rua"
          className="rounded-[3px] text-center"
          value={endereco.rua}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="numero">Número</label>
        <input
          type="number"
          id="numero"
          name="numero"
          className="rounded-[3px] text-center"
          value={endereco.numero}
          onChange={(e) => onChangeEndereco(e.target.name, Number(e.target.value))}
        />
        <label htmlFor="complemento">Complemento</label>
        <input
          type="text"
          id="complemento"
          name="complemento"
          className="rounded-[3px] text-center"
          value={endereco.complemento}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          className="rounded-[3px] text-center"
          value={endereco.bairro}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          className="rounded-[3px] text-center"
          value={endereco.cidade}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          id="estado"
          name="estado"
          className="rounded-[3px] text-center"
          value={endereco.estado}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          className="rounded-[3px] text-center"
          value={endereco.cep}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <div className="flex flex-row gap-32 justify-center mt-10">
          <button
            type="button"
            onClick={() => salvarEndereco(endereco)}
            className="w-1/2 p-2 shadow-md rounded-[3px] bg-green-700 text-white font-bold cursor-pointer2">
            Salvar
          </button>
          <button
            type="button"
            onClick={cancelar}
            className="w-1/2 p-2 shadow-md rounded-[3px] bg-purple text-white font-bold cursor-pointer">
            Limpar
          </button>
        </div>
      </form>
    );
  }
  function Linhas(endereco) {
    return (
      <tr key={endereco.id}>
        <td className="h-16 text-center">{endereco.id}</td>
        <td className="h-16 text-center">{endereco.idCliente}</td>
        <td className="h-16 text-center">{endereco.rua}</td>
        <td className="h-16 text-center">{endereco.numero}</td>
        <td className="h-16 text-center">{endereco.complemento}</td>
        <td className="h-16 text-center">{endereco.bairro}</td>
        <td className="h-16 text-center">{endereco.cidade}</td>
        <td className="h-16 text-center">{endereco.estado}</td>
        <td className="h-16 text-center">{endereco.cep}</td>
        <td className="flex justify-around">
          <button
            className="w-1/2 p-2 shadow-md rounded-[3px] bg-red-700 text-white font-bold mt-2 cursor-pointer"
            onClick={() => excluirEndereco(endereco)}>
            Excluir
          </button>
        </td>
      </tr>
    );
  }
  return (
    <>
      <h1 className="text-center py-3 text-white font-bold text-[20px] w-full bg-purple">Cadastro de Endereços</h1>
      {enderecos != [] ? Lista(enderecos) : Formulario()}
    </>
  );
}
export default Endereco;