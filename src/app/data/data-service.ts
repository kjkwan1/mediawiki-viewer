import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, Observable, retry, scan, share } from 'rxjs';
import { ChannelFilter, MessageType, RawMessage, StreamData } from './model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _queueSize = 50;

  private raw$: Observable<RawMessage> = this.createEventSource().pipe(
    retry({ delay: 5000 }),
    map(this.parse),
    filter((parsed) => !!parsed && this.isMessageValidForProcessing(parsed)),
    share(),
  );

  private readonly _filters: Record<MessageType, ChannelFilter[]> = {
    edit: [],
    new: [],
    log: [],
    categorize: [],
  }

  channel$(type: MessageType): Observable<StreamData[]> {
    const seenIds = new Set<string>();
    const filters = this._filters[type];
    
    return this.raw$.pipe(
      map(this.normalizeMessage),
      filter((msg: StreamData) => msg.type === type),
      filter((msg: StreamData) => {
        const id = msg.id as string;
        if (seenIds.has(id)) {
           return false;
        }
        seenIds.add(id);
        return true;
      }),
      scan(
        (queue: StreamData[], item: StreamData) =>
          [...queue.slice(-(this._queueSize - 1)), item],
        [],
      ),
      map((items) => {
        return items.filter((item) => {
          const filtersForType = filters || [];
          return filtersForType.every((filter) => {
            const value = item[filter.key];
            return filter.match(value);
          });
        });
      }),
      distinctUntilChanged(),
    );
  }

  addFilter(type: MessageType, filter: ChannelFilter) {
    this._filters[type].push(filter);
  }

  private parse(data: string): Object | null {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse data:', error);
      return null;
    }
  }

  private isMessageValidForProcessing(message: Object): message is RawMessage {
    return typeof message === 'object'
      && message !== null
      && 'type' in message
      && 'server_name' in message;
  }

  private normalizeMessage(message: RawMessage): StreamData {
    if (message.type === 'log') {
      return {
        ...message,
        type: 'log',
        id: message.log_id + '-' + message.log_type + '-' + message.log_action,
      }
    } else {
      return {
        ...message,
        id: message.id.toString(),
      } as StreamData;
    }
  }

  private createEventSource() {
    return new Observable<string>((subscriber) => {
      const source: EventSource = new EventSource(
        'https://stream.wikimedia.org/v2/stream/recentchange',
      );

      source.onmessage = (event: MessageEvent<string>) => {
        subscriber.next(event.data);
      };
      
      source.onerror = (error: Event) => {
        subscriber.error(error);
      };

      return () => {
        source.close();
      };
    });
  }
}
