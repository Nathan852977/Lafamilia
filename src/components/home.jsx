import { useState, useEffect } from "react";
import "../styles/styleHome.css"
import { getFirestore, collection, doc, setDoc, serverTimestamp, getDocs, query, where, orderBy, limit   } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCVU10gD8PGwehXToEXFappZeRJN8lNiOk",
    authDomain: "projectfamilylanchonete.firebaseapp.com",
    projectId: "projectfamilylanchonete",
  };

const firebaseApp = initializeApp(firebaseConfig);

export default function Home() {

    const [transitionDiv, setTransitionDiv] = useState(true)
    const [ballCor, setBallCor] = useState(true);

    const mudarCorBolas = () => {
        setBallCor(!ballCor)
        setTransitionDiv(!transitionDiv)
    };

    return (
        <div>    

            {transitionDiv ? (
                <ClienteModNew />
            ) : (
                <BancoClientes />
            )}

            <PassPrev mudarCorBolas={mudarCorBolas} ballCor={ballCor} />
        </div>
    )
}



function ClienteModNew() {

    const [escolhaOne, setEscolhaOne] = useState('');
    const [name, setName] = useState("")
    const [valor, setValor] = useState("")
    const [nomes, setNomes] = useState([]);
    const [escolha, setEscolha] = useState('');

    const handleEscolhaOne = (event) => {
        setEscolhaOne(event.target.value);
    };

    const [escolhaTwo, setEscolhaTwo] = useState('');

    const handleEscolhaTwo = (event) => {
        setEscolhaTwo(event.target.value);
    };

    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, "clientes");

    const [errorStatus, setErrorStatus] = useState("")

    const EnviteNewCliente = async () => {
        try {

            if (escolhaOne === '') {
                throw new Error('Escolha uma opção válida para o status (Devendo ou Pagando)');
            } if (name === '' || valor === '') {
                throw new Error('Porfavor nao deixe nada em (Branco)');
            }  if (!/^\d+$/.test(valor)) {
                throw new Error('O campo Valor deve conter apenas números');
            }

            // Adiciona um novo documento à coleção "clientes" com uma subcoleção "transacoes"
            const clienteDocRef = doc(userCollectionRef, name);
            await setDoc(clienteDocRef, {});
    
            // Adiciona um documento à subcoleção "transacoes" do cliente recém-criado
            const transacaoDocRef = doc(clienteDocRef, "transacoes", new Date().toISOString());
            await setDoc(transacaoDocRef, {
                valor: valor + ",00R$",
                Status: escolhaOne,
                timestamp: serverTimestamp(),
            });
        
            setErrorStatus('');
            console.log('Transação registrada com sucesso!');
        } catch (error) {
            const errorMessage = error.message || 'Erro ao registrar transação';
            setErrorStatus(errorMessage);
            console.error('Erro ao registrar transação:', error);
        }
    };
    

    const [valorMod, setValorMod] = useState([]);
    
    useEffect(() => {
        const buscarNomesClientes = async () => {
          const db = getFirestore(firebaseApp);
          const clientesCollection = collection(db, "clientes");
      
          try {
            const dados = await getDocs(clientesCollection);
      
            const nomesArray = [];
            dados.forEach((doc) => {
              // Obtendo o nome do documento (cliente)
              const nomeCliente = doc.id;
              nomesArray.push(nomeCliente);
            });
      
            setNomes(nomesArray);
          } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
          }
        };
      
        buscarNomesClientes();
      }, []);

    const EnviteModCliente = async () => {
        try {

            if (escolhaTwo === '') {
                throw new Error('Escolha uma opção válida para o status (Devendo ou Pagando)');
            } if (escolha === '' || valorMod === '') {
                throw new Error('Porfavor nao deixe nada em (Branco)');
            }  if (!/^\d+$/.test(valorMod)) {
                throw new Error('O campo Valor deve conter apenas números');
            }

            // Adiciona um novo documento à coleção "clientes" com uma subcoleção "transacoes"
            const clienteDocRef = doc(userCollectionRef, escolha);
            await setDoc(clienteDocRef, {});
    
            // Adiciona um documento à subcoleção "transacoes" do cliente recém-criado
            const transacaoDocRef = doc(clienteDocRef, "transacoes", new Date().toISOString());
            await setDoc(transacaoDocRef, {
                valor: valorMod + ",00R$",
                Status: escolhaTwo,
                timestamp: serverTimestamp(),
            });
    
            setErrorStatus('');
            console.log('Transação registrada com sucesso!');
        } catch (error) {
            const errorMessage = error.message || 'Erro ao registrar transação';
            setErrorStatus(errorMessage);
            console.error('Erro ao registrar transação:', error);
        }
    };

    return (

    <div>
        <section className="BoxinputClientes">

                <section className="secNewCliente">

                    <button onClick={EnviteNewCliente}> + </button>

                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Digite o Nome Do Cliente"
                    />

                    <select 
                    name="" id="" 
                    value={escolhaOne} 
                    onChange={handleEscolhaOne}>
                        <option value="" disabled hidden>
                            {escolhaOne ? '' : 'Defina'}
                        </option>
                        <option value="Devendo">Devendo</option>
                        <option value="Pagando">Pagando</option>
                    </select>

                    <input 
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    type="text" 
                    style={{width: "20%",}}
                    placeholder="Valor"
                    />

                </section>

                <p style={{color: "red", display: "flex", justifyContent: "center", fontSize: 23,}}> {errorStatus} </p>

                <section className="secModCliente">

                    <button onClick={EnviteModCliente}> + </button>

                    <select
                        className="modSelectCliente"
                        name=""
                        id=""
                        value={escolha}
                        onChange={(e) => setEscolha(e.target.value)}
                        style={{ backgroundColor: "#34495e" }}
                        >
                        <option value="" disabled hidden>
                            {escolha ? '' : 'Escolha um nome'}
                        </option>
                        {nomes.map((nomeCliente, index) => (
                            <option key={index} value={nomeCliente}>
                            {nomeCliente}
                            </option>
                        ))}
                    </select>
                    
                    <select name="" id="" value={escolhaTwo} onChange={handleEscolhaTwo} style={{width: "30%",}}>
                        <option value="" disabled hidden>
                            {escolhaTwo ? '' : 'Defina'}
                        </option>
                        <option value="Devendo">Devendo</option>
                        <option value="Pagando">Pagando</option>
                    </select>

                    <input 
                    value={valorMod}
                    onChange={(e) => setValorMod(e.target.value)}
                    type="text" 
                    placeholder="Valor"
                    />

                </section>


            </section>
        </div>
    )
}

function BancoClientes() {
    const [nomes, setNomes] = useState([]);
  
    useEffect(() => {
      const buscarNomes = async () => {
        const db = getFirestore(firebaseApp);
        const clientesCollection = collection(db, "clientes");
  
        try {
          const snapshot = await getDocs(clientesCollection);
          const nomesArray = snapshot.docs.map((doc) => doc.id);
          setNomes(nomesArray);
        } catch (error) {
          console.error("Erro ao buscar nomes:", error);
        }
      };
  
      buscarNomes();
    }, [firebaseApp]);
  
    return (
      <div className="boxAlignBC">
        {nomes.map((nome, index) => (
          <NomeClienteSection key={index} nome={nome} />
        ))}
      </div>
    );
  }
  
function NomeClienteSection({ nome }) {

    const [saldo, setSaldo] = useState(0);
    const [saldoVisivel, setSaldoVisivel] = useState(false);
    const [historico, setHistorico] = useState([]);

  const calcularSaldo = async () => {
    const db = getFirestore(firebaseApp);
    const clienteDocRef = doc(db, "clientes", nome);
    const transacoesCollection = collection(clienteDocRef, "transacoes");

    try {
      const snapshot = await getDocs(transacoesCollection);
      const transacoes = snapshot.docs.map((doc) => doc.data());
      const saldoCalculado = calcularSaldoTotal(transacoes);
      setSaldo(saldoCalculado);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const calcularSaldoTotal = (transacoes) => {
    return transacoes.reduce((total, transacao) => {
      const valorNumerico = parseFloat(transacao.valor.replace("R$", "").replace(",", "."));
      return transacao.Status === "Devendo" ? total - valorNumerico : total + valorNumerico;
    }, 0);
  };

  useEffect(() => {
    calcularSaldo();
  }, []); // Executar apenas uma vez ao montar o componente


    return (
      <section className="boxConstructorCliente">
   
            <h3>{nome}</h3>
        

        <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => setSaldoVisivel(!saldoVisivel)}>
                {saldoVisivel ? "👁" : "🔒"}
            </button>
            <p>
                {saldoVisivel
                ? `Saldo: ${saldo.toFixed(2)} R$`
                : 'Saldo: **** R$'}
            </p>
         </div>
                
      </section>
    );
  }
  


function PassPrev({ mudarCorBolas, ballCor }) {
  
    return (
      <div className="boxPN">
        <button onClick={mudarCorBolas}> ◀ </button>
        <p> Add </p>
  
        <span className={ballCor ? "ballWhite" : "ballClay" }></span>
        <span className={ballCor ? "ballClay" : "ballWhite" }></span>
  
        <p> Banco </p>
        <button onClick={mudarCorBolas} > ▶ </button>
      </div>
    );
};