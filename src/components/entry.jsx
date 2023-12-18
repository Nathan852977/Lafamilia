import React, { useState } from "react";
import "../styles/styleEntry.css"

export default function Entry({ onAutenticar }) {

    const usersAndPasswords = [
        { user: "Nathan", password: "852977" },
        { user: "Helio", password: "0472" },
        { user: "Daniel", password: "123" }, // Adicione mais usuários e senhas conforme necessário
        { user: "LaFamilia", password: "32890931" },
    ];

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    function realizarEntrada() {
        const usuarioEncontrado = usersAndPasswords.find(
            (entry) => entry.user === usuario && entry.password === senha
        );

        if (usuarioEncontrado) {
            onAutenticar();
            setMensagemErro("Sucesso");
            // Lógica adicional para entrar no aplicativo
        } else {
            setMensagemErro("Alerta de intruso!");
        }
    }


    return (
        <div>

            <section className="secMsgCode">
                <h3 className="mensageCodeEntry"> Codigo De Segurança Necessario </h3>
            </section>

            <section className="inputsEntrySec">
                <input
                type="text"
                placeholder="Usuário"
                className="inputEntry"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                type="password" // Alterado para type="password" para ocultar a senha
                placeholder="Senha"
                className="inputEntry"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </section>

            <section className="btnEntrySection">
                {mensagemErro && <p className="mensagemErro">{mensagemErro}</p>}
                <button className="btnEnviteEntry" onClick={realizarEntrada}> Enviar </button>
            </section>

        </div>
    )
}