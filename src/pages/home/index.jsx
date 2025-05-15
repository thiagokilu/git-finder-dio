import "./App.css";
import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/ItemList";

function App() {
	const [user, setUser] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const [repos, setRepos] = useState(null);

	const handleGetData = async () => {
		const userData = await fetch(`https://api.github.com/users/${user}`);
		const newUser = await userData.json();

		console.log(newUser);

		if (!newUser.message) {
			const { avatar_url, name, bio } = newUser;
			setCurrentUser({ avatar_url, name, bio });

			console.log("Current User:", currentUser);
			console.log("Repos:", repos);


			const reposData = await fetch(
				`https://api.github.com/users/${user}/repos`,
			);
			const newRepos = await reposData.json();

			if (newRepos.length) {
				setRepos(newRepos);
			}
		}
	};

	return (
		<div>
			<Header />
			<div className="conteudo">
				<img src={background} alt="background app" className="background" />
				<div className="info">
					<input
						type="text"
						name="usuario"
						placeholder="@username"
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
					<button type="button" onClick={handleGetData}>
						Buscar
					</button>
					{currentUser? (
						<>
							<div className="perfil">
								<img
									src={currentUser.avatar_url}
									alt="profile"
									className="profile"
								/>
								<div className="perfil-info">
									<h3>{currentUser.name}</h3>
									<span>@{user}</span>
									<p>{currentUser.bio}</p>
								</div>
							</div>
							<hr />
						</>
					) : null}

					{repos && repos.length > 0 ? (
						<div>
							<h4 className="repositorio">Repositórios</h4>
							{repos.map((repo) => (
								<ItemList
									key={repo.id}
									title={repo.name}
									description={repo.description || "Sem descrição"}
								/>
							))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App