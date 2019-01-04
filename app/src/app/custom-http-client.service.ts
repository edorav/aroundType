import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



export abstract class CustomHttpClientService<T> {

    constructor(
      protected http: HttpClient,
      //protected _authService: AuthService
    ) { }

    protected abstract getEndpoint(): string;

    private getHttpOptions() {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' /*+ this._authService.getToken()*/
        })
      };
    }

    public get(params?:string): Observable<T[]> {
      console.log(params)
      return this.http.get<T[]>(environment.restUrl + this.getEndpoint() + params, this.getHttpOptions())
        .pipe(
          tap(),
          catchError(this.handleError('getHeroes', []))
        );
    }

    public getThumbnail(thumbnail: string): string {
      return environment.restUrl + this.getEndpoint() + '/image/' + thumbnail;
    }


    public getBean(id: number): Observable<T> {
      const url = `${environment.restUrl + this.getEndpoint()}/${id}`;
      return this.http.get<T>(url, this.getHttpOptions()).pipe(
        tap(),
        catchError(this.handleError<T>(`getHero id=${id}`))
      );
    }

    /* GET heroes whose name contains search term */
    /*searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.endPoint}/?name=${term}`).pipe(
        tap(_ => console.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }*/

    //////// Save methods //////////

    addBean (bean: T): Observable<T> {
      return this.http.post<T>(environment.restUrl + this.getEndpoint(), bean, this.getHttpOptions()).pipe(
        tap((resultBean: T) => console.log(`added bean w/ id=${resultBean}`)),
        catchError(this.handleError<T>('addHero'))
      );
    }

    /** DELETE: delete the hero from the server */
    /*deleteHero (hero: T | number): Observable<T> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.endPoint}/${id}`;

      return this.http.delete<T>(url, httpOptions).pipe(
        tap(_ => console.log(`deleted hero id=${id}`)),
        catchError(this.handleError<T>('deleteHero'))
      );
    }*/

    updateBean (bean: T): Observable<T> {
      return this.http.put(environment.restUrl + this.getEndpoint(), bean, this.getHttpOptions()).pipe(
        tap(_ => console.log(`updated bean=${bean}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    // tslint:disable-next-line:no-shadowed-variable
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  }
