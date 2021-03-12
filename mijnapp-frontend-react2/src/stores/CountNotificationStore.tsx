import {action, IObservableValue, observable} from 'mobx';
import notificationService from '../services/notificationService';

export class CountNotificationStore {
    poll: any;
    interval: number = 5000;
    count: IObservableValue<number> = observable.box(0);

    pollingServer = action(() => {
        this.getCount();
        this.poll = setInterval(() => this.getCount(), this.interval);
    });

    getCount = action(() => {
        notificationService.getCount()
            .then(data => this.setCount(data.count))
            .catch(error => console.log(error));
    });

    setCount = action((count: number) => {
        if (this.count.get() === count) return;
        this.count.set(count);
    });

    abortPollingServer = action(() => {
        clearInterval(this.poll);
    });
}
