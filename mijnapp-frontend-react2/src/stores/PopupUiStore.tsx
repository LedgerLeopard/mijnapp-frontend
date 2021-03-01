import {action, IObservableValue, observable} from 'mobx';

export default class PopupUiStore {
    search: IObservableValue<boolean> = observable.box(false);
    success: IObservableValue<boolean> = observable.box(false);

    openSearch = action(() => this.search.set(true));
    closeSearch = action(() => this.search.set(false));

    openSuccess = action(() => this.success.set(true));
    closeSuccess = action(() => this.success.set(false));
}
