import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { JobService } from './services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'cakap-fe-test';
  jobs = [];
  categories = {} as any;
  cat_keys: string[] = [];
  cat_ids: string[] = []

  constructor(
    private jobsService: JobService
  ) {}

  ngOnInit(): void {
    this.jobsService.getAll()
    .subscribe({
      next: (v) => {
        for (const item of v) {
          const title = item.cat_title || "Uncategories"
          if ((this.categories as any)[title]) {
            (this.categories as any)[title].push(item)
          } else {
            (this.categories as any)[title] = [item]
            this.cat_ids.push(item.cat_id || '0');
          }
        }
        this.cat_keys = Object.keys(this.categories);
        // this.jobs = [...v] as any;`
        // this.categories = [...new Set([...v].map(({cat_title}) => cat_title ? cat_title : "Uncategories"))] as any;
        // console.log(this.categories);
      }
    })
  }
}
