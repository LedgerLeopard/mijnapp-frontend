import {action, IObservableValue, observable} from 'mobx';

export default class UiStore {
    dashboardHeader: IObservableValue<string> = observable.box('');

    setDashboardHeader = action((header: string) => {
        this.dashboardHeader.set(header);
    });
}
