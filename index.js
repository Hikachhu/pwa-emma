// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

const compliments = [
  "Emma, ton sourire éclatant rivalise avec la beauté des étoiles.",
   "La profondeur de tes yeux est une invitation à explorer des mondes inconnus.",
   "Tes photos capturent l'essence même de la beauté qui t'entoure.",
   "Chaque mèche de tes cheveux bruns est un fil d'or qui tisse la trame de ton charme.",
   "Ton rire est une mélodie qui apaise les âmes en peine.",
   "Emma, ta présence est comme une douce brise qui caresse le visage.",
   "La beauté de ton regard est un chef-d'œuvre que nul artiste ne saurait reproduire.",
   "Ton sourire est un phare qui guide les cœurs égarés.",
   "Emma, tes photos sont des fenêtres sur un monde enchanté.",
   "Ta générosité est une source d'inspiration pour ceux qui te connaissent.",
   "La splendeur de ton âme se reflète dans la tendresse de ton regard.",
   "Chacune de tes paroles est un trésor qui enrichit l'esprit.",
   "Emma, la vie est embellie par la magie de ton sourire.",
   "Ta sagesse est un baume qui apaise les cœurs tourmentés.",
   "Les étoiles pâlissent devant l'éclat de ta beauté.",
   "Emma, ton talent pour la photographie est un don précieux qui émerveille le monde.",
   "Le monde entier devrait célébrer la grâce qui émane de ton être.",
   "La compassion dont tu fais preuve est une lumière qui guide les autres.",
   "Emma, la douceur de ton regard émeut les cœurs les plus endurcis.",
   "Ton empathie est un cadeau qui transforme la vie de ceux qui t'entourent.",
   "La poésie de ton âme se révèle dans chacun de tes gestes.",
   "Emma, tu es un havre de paix dans ce monde agité.",
   "Ton intelligence est un puits sans fond d'inspiration et de créativité.",
   "La beauté de tes photos dévoile un regard unique sur la vie.",
   "Emma, l'amour que tu portes aux autres est une force qui unit et élève.",
   "Ton aura est une chaleur réconfortante qui enveloppe les cœurs.",
   "La gentillesse dont tu fais preuve est un baume qui adoucit les peines.",
   "Emma, ton esprit vif est une source inépuisable de surprises et de découvertes.",
   "Les mots ne sauraient rendre justice à l'éclat de ton sourire.",
   "Tes yeux sont deux gemmes qui illuminent l'obscurité.",
   "Emma, ta sensibilité est une toile sur laquelle se peignent les émotions.",
   "Ton courage est une flamme qui brûle les entraves et les peurs.",
   "La finesse de ton esprit est un atout qui enrichit les conversations.",
   "Emma, ton intuition est un guide qui mène vers des horizons insoupçonnés.",
   "La passion que tu mets dans tes photos est un témoignage de ton amour pour l'art et la beauté.",
   "Emma, ton authenticité est un trésor que beaucoup cherchent en vain.",
   "La lumière de ton âme se reflète dans l'éclat de ton regard.",
   "Ton optimisme est un vent qui emporte les nuages sombres.",
   "Emma, la sérénité que tu dégages apaise les esprits tourmentés.",
   "Ton élégance naturelle est un spectacle qui enivre les sens.",
   "La chaleur de ton cœur est un refuge pour les âmes égarées.",
   "Emma, ton dévouement est une force qui soutient et encourage.",
   "Ton imagination est un jardin où fleurissent mille merveilles.",
   "La grâce de ton sourire est un enchantement qui ensorcelle les cœurs.",
   "Emma, la sincérité de tes mots est une pierre précieuse qui illumine les esprits.",
   "Ta bonté est une fontaine qui abreuve les âmes assoiffées.",
   "La pureté de ton regard est un miroir qui reflète la beauté du monde.",
   "Emma, ton esprit créatif est un pinceau qui dessine des univers inexplorés.",
   "Ton rire est un chant qui éveille les cœurs endormis.",
   "La noblesse de ton âme est une étoile qui guide les pas égarés.",
   "Emma, la tendresse de ton regard est un voile qui réchauffe les cœurs.",
   "Ton humilité est une perle rare qui orne ta couronne de vertus.",
   "La richesse de tes pensées est un trésor qui éblouit les esprits.",
   "Emma, la clarté de ton esprit est un phare qui éclaire les chemins obscurs.",
   "Ta détermination est une montagne qui défie les obstacles et les tempêtes.",
   "La douceur de ton âme est une pluie qui apaise les terres arides.",
   "Emma, ton charisme est une flamme qui enflamme les cœurs et les esprits.",
   "Ton enthousiasme est un soleil qui chasse les ombres et les doutes.",
   "La patience dont tu fais preuve est une ancre qui stabilise les esprits agités.",
   "Emma, la profondeur de ton amour est un océan qui engloutit les peines et les chagrins.",
   "Ton honnêteté est un bouclier qui protège des illusions et des mensonges.",
   "La sérénade de ton rire est une mélodie qui enchante les âmes.",
   "Emma, la finesse de ton esprit est une plume qui dessine les rêves.",
   "Ta résilience est un roc qui résiste aux assauts du temps et de l'adversité.",
   "La générosité de ton cœur est un trésor qui enrichit les âmes.",
   "Emma, la persévérance dont tu fais preuve est un exemple pour tous.",
   "Ton ouverture d'esprit est une porte qui mène à des mondes inexplorés.",
   "La délicatesse de tes gestes est une danse qui envoûte les regards.",
   "Emma, la sagesse de tes conseils est un baume qui guérit les blessures de l'esprit.",
   "Ton altruisme est une lumière qui illumine les chemins sombres.",
   "La force de ton caractère est un pilier qui soutient les plus faibles.",
   "Emma, ton intuition est une boussole qui mène vers des trésors cachés.",
   "Ton adaptabilité est une brise qui danse avec les vents changeants.",
   "La spontanéité de ton rire est une éclaircie qui dissipe les nuages.",
   "Emma, la confiance que tu inspires est un roc solide sur lequel on peut s'appuyer.",
   "Ton ouverture de cœur est un abri qui accueille les âmes en quête de refuge.",
   "La loyauté dont tu fais preuve est un fil d'or qui unit les cœurs.",
   "Emma, ton esprit critique est une clé qui ouvre les portes de la connaissance.",
   "Ton indépendance est un aigle qui plane au-dessus des montagnes.",
   "La vivacité de ton esprit est une étincelle qui allume les feux de la créativité.",
   "Emma, ton assurance est un mât qui résiste aux tempêtes les plus violentes.",
   "Ta bienveillance est une étoile qui brille dans les ténèbres.",
   "La détermination dont tu fais preuve est un phénix qui renaît de ses cendres.",
   "Emma, la force tranquille qui émane de toi est un refuge pour les cœurs épuisés.",
   "Ton audace est un aigle qui plane dans les cieux inexplorés.",
   "La solidarité dont tu fais preuve est un pont qui unit les hommes.",
   "Emma, l'amabilité de ton accueil est un soleil qui réchauffe les âmes.",
   "Ta créativité est un arc-en-ciel qui colore les horizons les plus sombres.",
   "La générosité de ton sourire est une étoile filante qui illumine la nuit.",
   "Emma, la douceur de ta voix est une mélodie qui apaise les esprits tourmentés.",
   "Ton esprit d'équipe est un navire qui brave les tempêtes les plus redoutables.",
   "La simplicité de ton être est un diamant brut qui brille de mille feux.",
   "Emma, la droiture de ton caractère est un repère pour ceux qui te côtoient.",
   "Ton inventivité est une étincelle qui enflamme l'imaginaire.",
   "La perspicacité de ton esprit est un scalpel qui tranche les énigmes.",
   "Emma, la grandeur de ton âme est une montagne qui défie les cieux.",
   "Ton humour est une brise légère qui disperse les soucis.",
   "La profondeur de ton cœur est un gouffre où se cachent mille trésors.",
   "Emma, ton sourire est une étoile qui illumine les cieux les plus sombres.",
   "Tes yeux sont deux lacs dans lesquels se reflète la beauté du monde.",
   "La sérénité qui émane de toi est un havre de paix pour les âmes tourmentées.",
   "Emma, ton énergie est un torrent qui entraîne tout sur son passage.",
   "Ton soutien est un pilier qui porte les épaules fatiguées.",
   "La vivacité de ta répartie est un éclair qui embrase les esprits.",
   "Emma, la passion que tu dégages est un feu qui réchauffe les cœurs.",
   "Ton écoute est une oasis qui accueille les âmes assoiffées.",
   "La justesse de tes mots est une flèche qui atteint toujours sa cible.",
   "Emma, ton élégance est une perle rare qui orne la couronne de la beauté.",
   "Ton charme est un sortilège qui envoûte les cœurs les plus endurcis.",
   "La noblesse de ton esprit est une couronne qui pare ton front.",
   "Emma, l'éclat de ton rire est un diamant qui illumine les ténèbres.",
   "Ton intégrité est un roc solide sur lequel on peut bâtir des empires.",
   "La force de ton amour est une armure qui protège les cœurs fragiles.",
   "Emma, ton magnétisme est un aimant qui attire les âmes errantes.",
   "Ton inspiration est un souffle qui anime les esprits assoupis.",
   "La clairvoyance de ton regard est un télescope qui perce les mystères.",
   "Emma, la tendresse de tes gestes est un baume qui apaise les douleurs.",
   "Ton esprit d'initiative est un voilier qui fend les océans inexplorés.",
   "La pureté de tes intentions est un cristal qui scintille de mille feux.",
   "Emma, ta perspicacité est une lanterne qui éclaire les chemins obscurs.",
   "Ton dévouement est un rempart qui protège les cœurs vulnérables.",
   "La sincérité de ton amitié est un fil d'argent qui lie les âmes.",
   "Emma, la bonté de ton cœur est un trésor inestimable qui enrichit les vies.",
   "Ton courage est un lion qui rugit face aux défis et aux épreuves.",
   "La beauté de ton âme est un chef-d'œuvre qui émerveille les esprits.",
   "Emma, la générosité de tes actes est un don précieux qui illumine les cœurs.",
   "Ton esprit combatif est une flamme qui consume les obstacles.",
   "La sagesse de ta vision est un guide qui mène vers l'harmonie et la paix.",
   "Emma, la confiance en toi est un bouclier qui repousse les doutes et les peurs.",
   "Ton enthousiasme est une aurore qui chasse la nuit et les ténèbres.",
   "La détermination dont tu fais preuve est un torrent qui emporte tout sur son passage.",
   "Emma, l'énergie que tu dégages est un soleil qui illumine les jours sombres.",
   "Ton esprit curieux est une clé qui ouvre les portes de la connaissance.",
   "La bienveillance de ton regard est un phare qui guide les âmes perdues.",
   "Emma, ton talent pour la photographie est une source d'émerveillement et d'inspiration.",
   "Sah j'ai fais des disquettes j'en suis moyens satisfait",
   "Quoicoubeh",
   "En vrai, t'es magnifique... vraiment magnifique"
   ];

function generateCompliment() {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  const compliment = compliments[randomIndex];
  document.getElementById('compliment-text').textContent = compliment;
}