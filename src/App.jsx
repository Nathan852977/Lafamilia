import "./styles/styleApp.css"
import ReactPlayer from 'react-player';
import Entry from "./components/entry";
import { useState } from "react";
import Home from "./components/home";

export const App = () => {

  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

    // Função que será chamada quando o usuário e a senha estiverem corretos
    const autenticarUsuario = () => {
        setUsuarioAutenticado(true);
    };

  return (
    <div className="backgroundApp">
        <ReactPlayer
        url={require('./assets/backgroundApp.mp4')}  // Substitua 'seu_video.mp4' pelo nome do seu arquivo de vídeo
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        />

        <div className="content">
          <section className="secTitleApp">
            <h1 className="titleApp">Lanchonete Da Familia</h1>
          </section>
          

          <section className="boxCenterApp">
            {usuarioAutenticado ? (
              <Home />
            ) : (
              <Entry onAutenticar={autenticarUsuario} />
            )}
          </section>

        </div>
    </div>
  )
}