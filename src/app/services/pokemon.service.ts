import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(name: any) {
    return this.http.get<Pokemon>(this.apiUrl + name);
  }
}
