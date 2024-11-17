import React, { useState } from 'react';

const Calcul = ({ addNotes }) => {
  const [math, setMath] = useState('');
  const [informatique, setInformatique] = useState('');
  const [sport, setSport] = useState('');
  const [Anglais, setAnglais] = useState('');
  const [moyenne, setMoyenne] = useState(null);
  const [resultat, setResultat] = useState(''); // Ajout d'un état pour le résultat (admis/redoublé)

  // Fonction pour calculer la moyenne
  const calculerMoyenne = () => {
    const notes = [math, informatique, sport, Anglais];
    const somme = notes.reduce((acc, note) => acc + parseFloat(note), 0);
    return somme / notes.length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Si l'un des champs est vide ou invalide, on arrête l'exécution
    if (!math || !informatique || !sport || !Anglais) return;
    if (
      math < 0 || math > 20 ||
      informatique < 0 || informatique > 20 ||
      sport < 0 || sport > 20 ||
      Anglais < 0 || Anglais > 20
    ) return;

    // Calculer la moyenne
    const moyenneCalculée = calculerMoyenne();
    setMoyenne(moyenneCalculée);

    // Déterminer si l'étudiant est admis ou redoublé
    if (moyenneCalculée >= 10) {
      setResultat('Admis');
    } else {
      setResultat('Redoublé');
    }

    // Ajouter les notes via addNotes (fonction passée en props)
    addNotes({ math, informatique, sport, Anglais });

    // Réinitialiser les champs de formulaire
    setMath('');
    setInformatique('');
    setSport('');
    setAnglais('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Calcul Résultat de l'étudiant</h1>
      </div>

      <div>
        <label>Math</label><br />
        <input 
          type="number" 
          value={math} 
          onChange={(e) => setMath(e.target.value)} 
          placeholder="Note Math" 
        />
      </div>

      <div>
        <label>Informatique</label><br />
        <input 
          type="number" 
          value={informatique} 
          onChange={(e) => setInformatique(e.target.value)} 
          placeholder="Note Informatique" 
        />
      </div>

      <div>
        <label>Sport</label><br />
        <input 
          type="number" 
          value={sport} 
          onChange={(e) => setSport(e.target.value)} 
          placeholder="Note Sport" 
        />
      </div>

      <div>
        <label>Anglais</label><br />
        <input 
          type="number" 
          value={Anglais} 
          onChange={(e) => setAnglais(e.target.value)} 
          placeholder="Note Anglais" 
        />
      </div>

      <div>
        <button className='btn btn-primary' type="submit">Calculer</button>
      </div>

      {/* Affichage de la moyenne */}
      {moyenne !== null && <div><strong>Moyenne: {moyenne.toFixed(2)}</strong></div>}

      {/* Affichage du résultat (Admis ou Redoublé) */}
      {resultat && <div><strong>Résultat: {resultat}</strong></div>}
    </form>
  );
};

export default Calcul;