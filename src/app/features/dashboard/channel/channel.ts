import { ChangeDetectionStrategy, Component, effect, Host, HostBinding, input, signal, WritableSignal } from '@angular/core';
import { StreamData } from '../../../data/model';

@Component({
  selector: 'app-channel',
  imports: [],
  templateUrl: './channel.html',
  styleUrl: './channel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Channel {
  type = input.required<string>();
  channel = input.required<StreamData[]>();

  watched: WritableSignal<StreamData[]> = signal<StreamData[]>([]);

  @HostBinding('class')
  get hostClass(): string {
    return `channel-type-${this.type()}`;
  }

  onSelect(item: StreamData) {
    this.watched.update((watched) => {
      if (watched.includes(item)) {
        return watched.filter((i) => i !== item);
      } else {
        return [...watched, item];
      }
    })
  }
}
