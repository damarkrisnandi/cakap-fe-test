import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

export interface Job {
    id: string,
    jobid: string,
    title: string,
    alias: string,
    startpublishing: Date,
    created: Date,
    cat_id: string,
    cat_title: string,
    cat_alias: string,
    company: string | null,
    companyalias: string | null,
    compid: string | null,
    companyurl: string | null,
    address1: string | null,
    logo: string | null,
    compuid: string | null,
    jobtype: string,
    jtpalias: string,
    city: string,
    city_alias: string,
    country: string
}
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getAll = () => this.http.get<Job[]>(apiUrl + '/jobs')
}
