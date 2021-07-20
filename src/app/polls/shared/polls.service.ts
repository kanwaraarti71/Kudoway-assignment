import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {poll} from './poll';

@Injectable()
export class pollsService {
  protected URL = 'http://localhost:3000/api/polls';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<poll> {
    return this.http.get<poll>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<poll[]> {
    return this.http.get<poll[]>(this.URL, {params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<poll> {
    return this.http.delete<poll>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: poll): Observable<poll> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<poll>(this.URL, data, {headers});
  }

  /**
   * Update specific object into DB
   * @param poll the object to be updated
   * @returns gets the response
   */
  public update(poll: poll): Observable<poll> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<poll>(this.URL + '/' + poll.id, poll, {headers});
  }
}
