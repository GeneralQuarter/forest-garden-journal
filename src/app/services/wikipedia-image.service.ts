import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Plant } from '../models/plant';

interface WikipediaResult {
  query: {
    pages: {
      [pId: string]: {
        original?: {
          source: string;
        }
      }
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaImageService {
  url = `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects&origin=*&titles=`;
  cache: {[title: string]: string} = {};

  constructor(
    private http: HttpClient
  ) {
  }

  imageUrlForPlant(plant: Plant): Observable<string | null> {
    const title = `${plant.genus}+${plant.species.toLowerCase()}`;
    const fromCache = this.cache[title];

    if (fromCache) {
      return of(fromCache);
    }

    return this.http.get<WikipediaResult>(`${this.url}${title}`).pipe(
      map(result => {
        const [pageId, page] = Object.entries(result.query.pages)[0];

        if (pageId === '-1') {
          return null;
        }
        const url = page.original.source;

        this.cache[title] = url;
        return url;
      })
    );
  }
}
