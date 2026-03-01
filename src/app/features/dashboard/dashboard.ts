import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../data/data-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageType, StreamData } from '../../data/model';
import { Channel } from './channel/channel';

export interface StreamChannel {
  type: MessageType;
  data$: Observable<StreamData[]>;
}

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, Channel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DataService],
})
export class Dashboard {
  streams: StreamChannel[] = [];

  constructor(
    public dataService: DataService,
  ) {
    const types: MessageType[] = ['edit', 'new', 'log', 'categorize'];
    this.streams = types.map((type) => ({
      type,
      data$: this.dataService.channel$(type)
    }));

    setTimeout(() => {
      this.dataService.addFilter('edit', {
        key: 'server_name',
        match: (value) => value === 'en.wikipedia.org',
      });
      this.dataService.addFilter('new', {
        key: 'server_name',
        match: (value) => value === 'en.wikipedia.org',
      });
      this.dataService.addFilter('log', {
        key: 'server_name',
        match: (value) => value === 'en.wikipedia.org',
      });
      this.dataService.addFilter('categorize', {
        key: 'server_name',
        match: (value) => value === 'en.wikipedia.org',
      });
    }, 5000);
  }
}
