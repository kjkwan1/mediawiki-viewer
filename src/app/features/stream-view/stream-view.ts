import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stream-view',
  imports: [],
  templateUrl: './stream-view.html',
  styleUrl: './stream-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamView {
}
