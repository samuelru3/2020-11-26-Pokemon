const PokemonApp = {
    data() {
        return {
            // --- Daten des neuen Pokemons ---                    
            name: 'Pikachu',
            typ1: 'Wasser',
            typ2: 'Elektro',
            gender: 'w',
            donnerblitz: false,
            voltoball: true,
            surfer: false,

            // --- Liste aller Pokemons ---
            pokemonList: [
                { id: 0, name: 'Voltoball', typ1: 'Elektro', typ2: 'Wasser', gender: 'd', donnerblitz: true, voltoball: true, surfer: false, attacken: 'Donnerblitz, Voltoball' },
                { id: 1, name: 'Relaxo', typ1: 'Normal', typ2: 'Normal', gender: 'm', donnerblitz: false, voltoball: false, surfer: true, attacken: 'Surfer' }
            ],

            // --- Variablen zum Sichtbarmachen ---
            displayFormular: false,
            displayStatistik: true,
            displayListe: true,
        }
    },

    computed: {
        // --- berechnete Datenfelder ---
        // --- werden zwischengespeichert ---
        anzahlPokemons(){
            return this.pokemonList.length;
        },

        anzahlMaennlich(){
            let anzahl = 0;
            for(let i=0; i<this.pokemonList.length; i++){
                if(this.pokemonList[i].gender === 'm'){
                    anzahl++;
                }
            }
            return anzahl;
        },

        anzahlWeiblich(){
            let anzahl = 0;
            for(let i=0; i<this.pokemonList.length; i++){
                if(this.pokemonList[i].gender === 'w'){
                    anzahl++;
                }
            }
            return anzahl;
        },

        anteilWeiblichProzent(){
            const prozentWert = 100 * this.anzahlWeiblich / this.anzahlPokemons;
            const prozentWertGerundet = prozentWert.toFixed(0);
            return prozentWertGerundet;
        },

        anzahlDivers(){
            let anzahl = 0;
            for(let i=0; i<this.pokemonList.length; i++){
                if(this.pokemonList[i].gender === 'd'){
                    anzahl++;
                }
            }
            return anzahl;
        },

        nextId(){
            // maximale Id + 1
            let maximaleId = -1;
            for(let i=0; i<this.pokemonList.length; i++){
                if(this.pokemonList[i].id > maximaleId){
                    maximaleId = this.pokemonList[i].id;
                }
            }
            return maximaleId + 1;
        },

        attackenliste() {
            let text = '';
            if (this.donnerblitz) {
                text += 'Donnerblitz ';
            }
            if (this.voltoball) {
                text += 'Voltoball ';
            }
            if (this.surfer) {
                text += 'Surfer ';
            }
            return text;
        }
    },

    methods: {
        hinzufuegen() {
            // neues Pokemon erzeugen
            const newPokemon = {
                id: this.nextId,
                name: this.name,
                typ1: this.typ1,
                typ2: this.typ2,
                gender: this.gender,
                donnerblitz: this.donnerblitz,
                voltoball: this.voltoball,
                surfer: this.surfer,
                attacken: this.attackenliste
            };

            // neues Pokemon an Liste anhängen
            this.pokemonList.push(newPokemon);

            // Statistik und Liste Anzeigen
            this.statistikUndListeAnzeigen();

            //Daten persistent Speichern
            this.speichern();
        },       
        
        speichern(){
            // Komplettes Array mit Pokemons im 'localStorage' Speichern
            console.log("Speichern");
            const text = JSON.stringify(this.pokemonList);
            localStorage.setItem('pokemonliste', text)
            console.log(text);
        },

        laden(){
            if (localStorage.getItem('pokemonliste')) {
                let dataString = localStorage.getItem('pokemonliste');
                this.pokemonList = JSON.parse(dataString);
            } else {
                this.pokemonList = [];
            }
        },

        statistikUndListeAnzeigen(){
            this.displayFormular = false,
            this.displayStatistik = true,
            this.displayListe = true
        },
        
        formularAnzeigen(){
            this.displayFormular = true,
            this.displayListe = false,
            this.displayStatistik = false
        },

        loeschen(id) {
            // Pokemon mit der id von Liste enfernen
            let index = -1;
            for(let i=0; i<this.pokemonList.length; i++){
                if(this.pokemonList[i].id === id){
                    index = i;
                }
            }
            this.pokemonList.splice(index,1);

            //Daten persistent Speichern
            this.speichern();
        }
    },

    mounted(){
        //Persistent gespeichertre Daten Laden
        this.laden();
    }
};
Vue.createApp(PokemonApp).mount('#pokemon-app');