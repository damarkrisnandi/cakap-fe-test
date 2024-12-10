import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy{
  @Input() items = [] as Job[];
  currentIndex = 0;
  shiftNumber = 1
  showNumber = 3

  autoSlideSubscription$ = new Subscription();

  ngOnInit(): void {
      this.startAutoSlide();
  }

  getTransform() {
    return `translateX(-${this.currentIndex * (100 / this.showNumber)}%)`;
  }

  next() {
    if (this.currentIndex < this.items.length - 3) {
      this.currentIndex += this.shiftNumber;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.shiftNumber;
    } else {
      this.currentIndex = Math.floor(this.items.length / this.showNumber) * this.shiftNumber;
    }
  }

  startAutoSlide() {
    const time = 4000;

    this.autoSlideSubscription$ = interval(time)
    .subscribe({
      next: () => { this.next(); },
    })
  }

  ngOnDestroy(): void {
    this.autoSlideSubscription$.unsubscribe();
  }
}
