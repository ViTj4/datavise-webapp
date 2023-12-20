import axios from 'axios'

export const Erreur = () => {
  const handleClick = () => {



  axios.get('http://localhost:3000/')
  .then(response => {
    // Traitement des données de réponse
    console.log(response.data);
  })
  .catch(error => {
    // Gestion des erreurs
    console.error('Erreur lors de la requête GET:', error);
  });
  
}
  return (
    <div>
      <h1>TouT Casser</h1>
      <button onClick={ () => handleClick()}>google</button>
    </div>
  )
}
