import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule]
})
export class HomePage implements OnInit{
  //pokemons: any[] = [];
  showSearchBar: boolean = false;

  pokemonService: PokemonService = new PokemonService(this.http);
  pokemons: any[] = [];
  clases: any[] = [
    'bug','dark','dragon','electric',
    'fairy','fighting','fire','flying',
    'ghost','grass','ground','ice','normal',
    'poison','psychic','rock','steel','water'];
  tamanhos : any[] = ['medium', 'short', 'tall'];
  pesos : any[] = ['heavy', 'light', 'normal'];
  rangeValue = { lower: 1, upper: 3 };
  generations: any[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private http: HttpClient) {}

  showSearch() {
    this.showSearchBar = !this.showSearchBar;
  }
  searchChanged(event: any){
    if(event.detail.value > 0){
      this.pokemonService.getPokemon(event.detail.value).subscribe((data) =>{
        this.pokemons = [];
        this.pokemons.push(data);
      });
    }
    console.log(event.detail.value);
  }

  smallestFirst(){
    this.pokemons.sort((uno: any, dos: any) =>{
      return uno.id - dos.id;
    });
  }

  highestFirst(){
    this.pokemons.sort((uno: any, dos: any) =>{
      return dos.id - uno.id;
    });
  }

  fromAtoZ(){
    this.pokemons.sort((uno: any, dos: any) =>{
      return uno.name.localeCompare(dos.name);
    });
  }

  fromZtoA(){
    this.pokemons.sort((uno: any, dos: any) =>{
      return dos.name.localeCompare(uno.name);
    });
  }

  
  ngOnInit() {
    for(let i = 1; i <= 100; i++){
      this.pokemonService.getPokemon(i).subscribe((data) =>{
        this.pokemons.push(data);
      });
    }
  }
}

  
    /*ngOnInit() {
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1000').subscribe(res => {
        for (const pokemon of res.results) {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
          const newPokemon = {
            name: pokemon.name,
            imageUrl: imageUrl
          };
          this.pokemons.push(newPokemon);
        }
      });
    }*/

