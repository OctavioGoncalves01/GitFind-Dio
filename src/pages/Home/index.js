import { useState } from "react";
import { Header } from "../../Componentes/Header";
import background from "../../assets/gitbc.png";
import ItemList from "../../Componentes/ItemList";
import "./style.css";

function App() {
  const [user, setUser] = useState('');
  const [currentUSer, setCurrtentUser] = useState('');
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUSer = await userData.json();

    if (newUSer.name) {
      const { avatar_url, name, bio, login } = newUSer;
      setCurrtentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} 
              onChange={event => setUser(event.target.value)} 
              placeholder="@Username" 
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUSer?.name ? (
            <>
              <div className="perfil">
                <img src={currentUSer.avatar_url} className="profile" alt="foto" />
                <div>
                  <h3>{currentUSer.name}</h3>
                  <span>@{currentUSer.login}</span>
                  <p>{currentUSer.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}

          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositorio</h4>
              {repos.map(repositorio => (
                <ItemList tittle={repositorio.name} 
                  description={repositorio.description} 
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}






export default App;