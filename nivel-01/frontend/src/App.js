import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
// import backgroundImage from './assets/background.jpeg';

import Header from './components/Header';

function App () {
  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  },[])
  async function handleAddProjet () {
    // projects.push(`Novo Projeto ${Date.now()}`);
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Daniel Morita"
    // }).then(response => {
    //   setProjects([...projects, response.data]);
    })

    const project = response.data;
    setProjects([...projects, project]);
    console.log(projects);
  }
  return (
    <>
      <Header/>
      {/* <img width={300} src={backgroundImage} alt=""/> */}
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProjet}>Adicionar Projeto</button>
    </>
  );
}

export default App;