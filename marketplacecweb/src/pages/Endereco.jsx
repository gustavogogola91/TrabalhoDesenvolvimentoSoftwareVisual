import axios from "axios";
import { useState, useEffect } from "react";

function Endereco() {
  const [endereco, setEndereco] = useState(null);
  const [enderecos, setEnderecos] = useState([]);

  async function salvarEndereco(endereco) {
    try {
      if (endereco.id != null) {
        await axios.put(
          `http://localhost:3000/enderecos/${endereco.id}`,
          endereco
        );
      } else {
        await axios.post("http://localhost:3000/enderecos/", endereco);
      }
      setEndereco(null);
      alert("Endereço salvo com sucesso!");
      listarEnderecos();
    } catch (error) {
      alert("Erro ao salvar o endereço. Tente novamente.");
      console.error(error);
    }
  }

  function cancelar() {
    setEndereco(null);
  }

  function listarEnderecos() {
    axios.get("http://localhost:3000/enderecos").then((resposta) => {
      setEnderecos(resposta.data);
    });
  }

  function excluirEndereco(endereco) {
    try {
      axios
        .delete(`http://localhost:3000/enderecos/${endereco.id}`)
        .then(() => listarEnderecos());
      alert("Endereço excluído com sucesso");
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
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
      idCliente: "",
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
      <table className="m-auto table-auto bg-cream rounded-xl">
        <thead>
          <tr>
            <th className="w-16 h-16 p-2 text-center">ID</th>
            <th className="w-32 text-center">Id Cliente</th>
            <th className="w-48 text-center">Rua</th>
            <th className="w-16 text-center">Número</th>
            <th className="w-48 text-center">Complemento</th>
            <th className="w-48 text-center">Bairro</th>
            <th className="w-48 text-center">Cidade</th>
            <th className="w-48 text-center">Estado</th>
            <th className="w-32 text-center">CEP</th>
            <th className="w-48 text-center">Ações</th>
            <th className="w-48 text-center">
              <button
                className="border border-black rounded-xl p-2"
                onClick={adicionarEndereco}>
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
      <form className="m-auto h-auto flex flex-col gap-4 w-96 bg-cream p-4 rounded-xl mb-24 text-center">
        <label htmlFor="idCliente">Id Cliente</label>
        <input
          type="number"
          id="idCliente"
          name="idCliente"
          className="rounded-xl text-center"
          value={endereco.idCliente}
          onChange={(e) => onChangeEndereco(e.target.name, Number(e.target.value))}
        />
        <label htmlFor="rua">Rua</label>
        <input
          type="text"
          id="rua"
          name="rua"
          className="rounded-xl text-center"
          value={endereco.rua}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="numero">Número</label>
        <input
          type="number"
          id="numero"
          name="numero"
          className="rounded-xl text-center"
          value={endereco.numero}
          onChange={(e) => onChangeEndereco(e.target.name, Number(e.target.value))}
        />
        <label htmlFor="complemento">Complemento</label>
        <input
          type="text"
          id="complemento"
          name="complemento"
          className="rounded-xl text-center"
          value={endereco.complemento}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          className="rounded-xl text-center"
          value={endereco.bairro}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          className="rounded-xl text-center"
          value={endereco.cidade}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          id="estado"
          name="estado"
          className="rounded-xl text-center"
          value={endereco.estado}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          className="rounded-xl text-center"
          value={endereco.cep}
          onChange={(e) => onChangeEndereco(e.target.name, e.target.value)}
        />
        <div className="flex flex-row gap-32 justify-center mt-10">
          <button
            type="button"
            onClick={() => salvarEndereco(endereco)}
            className="border border-black rounded-xl p-2">
            Salvar
          </button>
          <button
            type="button"
            onClick={cancelar}
            className="border border-black rounded-xl p-2">
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  function Linhas(enderecos) {
    return enderecos.map((endereco) => (
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
            className="border border-black rounded-xl p-2"
            onClick={() => editarEndereco(endereco)}>
            Editar
          </button>
          <button
            className="border border-black rounded-xl p-2"
            onClick={() => excluirEndereco(endereco)}>
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <h1 className="text-center w-full bg-purple">Cadastro de Endereços</h1>
      {endereco == null ? Lista(enderecos) : Formulario()}
    </>
  );
}

export default Endereco;
