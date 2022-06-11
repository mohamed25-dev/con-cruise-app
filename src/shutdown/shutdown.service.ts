import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ShutdownService implements OnModuleDestroy {
  private shutdownListener$: Subject<void> = new Subject();

  onModuleDestroy() {
    console.log('Executing OnDestroy Hook');
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  shutdown() {
    this.shutdownListener$.next();
  }
}
