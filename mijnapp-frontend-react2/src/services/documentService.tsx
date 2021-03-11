import {Documents_MOKE} from '../MOKE/MOKE';

const documentsService = {
    getDocuments: (): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(Documents_MOKE.getDocuments), 1000));
    },
    getDocument: (id: string): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(Documents_MOKE.getDocument), 1000));
    },
};

export default documentsService;
