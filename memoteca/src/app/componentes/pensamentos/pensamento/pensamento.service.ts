import { Pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({/*injeção de dependencia */
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos'
  constructor(private http: HttpClient) {
  }
  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API)/* pegar a lista de pensamentos da API*/
    /*OBSERVAÇÃO
    Para funcionar, é necessário manter ativado no terminal
    o backend json com comando npm start na pasta /backend
    e também iniciar o localhost em ng serve
     */
  }
  /*função criar */
  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API,pensamento)
    
  }
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  excluir(id: string): Observable<Pensamento>{
   const url = `${this.API}/${id}`
   return this.http.delete<Pensamento>(url) 
  }
  buscarPorId(id: string): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }
}
