import {action, IObservableValue, observable} from 'mobx';
import {SearchType} from '../share/constants/searchType';


const animationTime = 230; //ms

export default class PopupUiStore {
    search: IObservableValue<boolean> = observable.box(false);
    searchMode: IObservableValue<SearchType> = observable.box(SearchType.Default);
    destroySearch: IObservableValue<boolean> = observable.box(false);

    openSearch = action((mode?: SearchType) => {
        this.searchMode.set(mode ? mode : SearchType.Default);
        this.search.set(true);
        this.destroySearch.set(true);
    });

    closeSearch = action(() => {
        this.search.set(false);
        setTimeout(() => this.destroy(this.destroySearch), animationTime);
    });

    success: IObservableValue<boolean> = observable.box(false);
    successHeader: IObservableValue<string> = observable.box('');
    successSubheader: IObservableValue<string> = observable.box('');
    destroySuccess: IObservableValue<boolean> = observable.box(false);

    openSuccess = action((header: string, subheader: string) => {
        this.successHeader.set(header);
        this.successSubheader.set(subheader);
        this.success.set(true);
        this.destroySuccess.set(true);
    });

    closeSuccess = action(() => {
        this.success.set(false);
        this.successHeader.set('');
        this.successSubheader.set('');
        setTimeout(() => this.destroy(this.destroySuccess), animationTime);
    });

    createSharedData: IObservableValue<boolean> = observable.box(false);
    destroyCreateSharedData: IObservableValue<boolean> = observable.box(false);

    openCreateSharedData = action(() => {
        this.createSharedData.set(true);
        this.destroyCreateSharedData.set(true);
    });

    closeCreateSharedData = action(() => {
        this.createSharedData.set(false);
        setTimeout(() => this.destroy(this.destroyCreateSharedData), animationTime);
    });

    destroy = action((field: any) => field.set(false));
}
