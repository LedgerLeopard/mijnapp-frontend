import {action, IObservableValue, observable, reaction} from 'mobx';
import {SearchType} from '../share/constants/searchType';
import {CleaningMode, ModeForSharedData} from '../share/constants/popUpModifiers';


const animationTime = 230; //ms

export default class PopupUiStore {

    // Search Pop-up
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

    // Success Pop-up
    success: IObservableValue<boolean> = observable.box(false);
    resultSuccessValue: IObservableValue<any> = observable.box(null);
    successHeader: IObservableValue<string> = observable.box('');
    successSubheader: IObservableValue<string> = observable.box('');
    destroySuccess: IObservableValue<boolean> = observable.box(false);

    openSuccess = action(async (header: string, subheader?: string): Promise<any> => {
        this.successHeader.set(header);
        this.successSubheader.set(subheader || '');
        this.success.set(true);
        this.destroySuccess.set(true);
        return this.subscribeToValue(this.resultSuccessValue);
    });

    closeSuccess = action((value?: any) => {
        this.success.set(false);
        this.successHeader.set('');
        this.successSubheader.set('');
        this.resultSuccessValue.set(value);
        setTimeout(() => this.destroy(this.destroySuccess), animationTime);
    });

    //CreatingSharedInfo Pop-up
    createSharedData: IObservableValue<boolean> = observable.box(false);
    sharedDataPopupMode: IObservableValue<ModeForSharedData> = observable.box(ModeForSharedData.Create);
    resultSharedDataValue: IObservableValue<any> = observable.box(null);
    destroyCreateSharedData: IObservableValue<boolean> = observable.box(false);

    openCreateSharedData = action((mode?: ModeForSharedData) => {
        this.createSharedData.set(true);
        if (mode) this.sharedDataPopupMode.set(mode);
        this.destroyCreateSharedData.set(true);
        return this.subscribeToValue(this.resultSharedDataValue);
    });

    closeCreateSharedData = action((value?: any) => {
        this.createSharedData.set(false);
        this.resultSharedDataValue.set(value);
        this.sharedDataPopupMode.set(ModeForSharedData.Create);
        setTimeout(() => this.destroy(this.destroyCreateSharedData), animationTime);
    });

    //ChangingUserData
    changingUserData: IObservableValue<boolean> = observable.box(false);
    additionalUserData: IObservableValue<{ _id: string, type: string, header: string, address: string }> = observable.box(Object(null));
    resultChangingUserDataValue: IObservableValue<any> = observable.box(null);
    destroyChangingUserData: IObservableValue<boolean> = observable.box(false);

    openChangingUserData = action((additionalUserData: { _id: string, type: string, header: string, address: string }) => {
        this.changingUserData.set(true);
        this.additionalUserData.set(additionalUserData);
        this.destroyChangingUserData.set(true);
        return this.subscribeToValue(this.resultChangingUserDataValue);
    });

    closeChangingUserData = action((value?: any) => {
        this.changingUserData.set(false);
        this.resultChangingUserDataValue.set(value);
        setTimeout(() => this.destroy(this.destroyChangingUserData), animationTime);
    });


    // Terminate Pop-up
    terminate: IObservableValue<boolean> = observable.box(false);
    resultTerminateValue: IObservableValue<any> = observable.box(null);
    destroyTerminate: IObservableValue<boolean> = observable.box(false);

    openTerminate = action(async (): Promise<boolean> => {
        this.terminate.set(true);
        this.destroyTerminate.set(true);
        return this.subscribeToValue(this.resultTerminateValue);
    });

    closeTerminate = action((value?: any) => {
        this.terminate.set(false);
        this.resultTerminateValue.set(value);
        setTimeout(() => this.destroy(this.destroyTerminate), animationTime);
    });

    subscribeToValue = action(async (observedValue: any): Promise<any> => {
        return await new Promise(resolve =>
            reaction(() => observedValue.get(), () => resolve(observedValue.get())));
    });
    clearResultValue = action((mode?: CleaningMode) => {
        const results: any = {
            success: this.resultSuccessValue,
            sharedData: this.resultSharedDataValue,
            changingUserData: this.resultChangingUserDataValue,
            terminate: this.resultTerminateValue
        };
        switch (mode) {
            case CleaningMode.Success:
                results.success.set(null);
                break;
            case CleaningMode.SharedData:
                results.sharedData.set(null);
                break;
            case CleaningMode.ChangingUserData:
                results.changingUserData.set(null);
                break;
            case CleaningMode.Terminate:
                results.terminate.set(null);
                break;
            default:
                Object.keys(results).forEach(key => results[key].set(null));
                break;
        }
    });
    destroy = action((field: IObservableValue<boolean>) => field.set(false));
}
