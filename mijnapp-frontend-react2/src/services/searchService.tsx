import {SearchItems_MOKE} from '../MOKE/MOKE';
import {SearchItem} from '../models/SearchItem';

const searchService = {
    search: (search: string): Promise<SearchItem[]> => {
        return new Promise<SearchItem[]>(resolve => setTimeout(() => resolve(SearchItems_MOKE.default.map(item => new SearchItem(item))), 1000));
    },
    searchData: (search: string): Promise<SearchItem[]> => {
        return new Promise<SearchItem[]>(resolve => setTimeout(() => resolve(SearchItems_MOKE.data.map(item => new SearchItem(item))), 1000));
    },
    searchOrganizations: (search: string): Promise<SearchItem[]> => {
        return new Promise<SearchItem[]>(resolve => setTimeout(() => resolve(SearchItems_MOKE.organization.map(item => new SearchItem(item))), 1000));
    }
};

export default searchService;
