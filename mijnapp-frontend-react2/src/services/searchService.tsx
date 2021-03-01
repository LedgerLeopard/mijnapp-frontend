const searchService = {
    search: (search: string): Promise<any> => {
        return new Promise<any>(resolve => {
            setTimeout(() =>
                resolve([
                    {_id: '1', header: 'Ik ga verhuizen', subheader: ''},
                    {_id: '2', header: 'Test 1', subheader: 'Subheader 1'},
                    {_id: '3', header: 'Test 2', subheader: 'Subheader 2'},
                ]), 1000);
        });
    }
};

export default searchService;
