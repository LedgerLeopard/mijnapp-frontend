export const UserData_MOKE = {
    _id: 'ddfe0514-7330-4a1a-9f6a-66385046c79d',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTU1NDU4NDIsImV4cCI6MTY0NzA4MTg0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.p7V33LUDSq1z7S4yG2gYEbppRzCPTOaZMY1EwjAPPNk',
    login: 'Login',
    firstName: 'Henk',
    lastName: 'de Vries',
    birthday: '13-04-1984',
    BSN: '12345678',
    birthplace: 'Utrecht',
    countryBirth: 'Nederland',
    marriage: 'Evelien de Vries',
    children: 'Paul de Vries',
    avatar: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ou491rxps6feoxbndi1qt_84854.jpg'
};

export const SearchItems_MOKE = {
    default: [{
        _id: 'b405e62a-5aec-4f68-8538-e3b5c5713193',
        type: 'moving',
        name: 'Ik ga verhuizen',
        address: 'Nieuwezijds Voorburgwal 147, 1012RJ Amsterdam'
    }],
    data: [
        {
            _id: 'ef90736b-bcae-4c72-b55d-2cbc6dfd29f1',
            type: 'data',
            name: 'Bevestiging ondersteuning',
            additionalName: 'Gemeente X',
            status: 'active'
        },
        // {
        //     _id: '0aed413c-27d9-4944-9a8a-a8e671ee21d4',
        //     type: 'data',
        //     name: 'Test',
        //     additionalName: 'Test',
        //     status: 'blocked'
        // }
    ],
    organization: [
        {
            _id: '0925609e-84fc-44e3-96b7-e27140b5932f',
            type: 'organization',
            name: 'Centraal Justitieel Incassobureau',
            logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png'
        },
        {
            _id: '007b8592-87cb-4057-bf33-2ee030dcf72a',
            type: 'organization',
            name: 'Belastingdienst',
            logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png'
        }
    ]
};


export const SharedData_MOKE = {
    getOrganizationsWithAccess: [{
        _id: 'ef90736b-bcae-4c72-b55d-2cbc6dfd29f1',
        logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png',
        organizationName: 'Centraal Justitieel Incassobureau',
        createAt: '2019-12-31T23:00:00.000Z'
    }],
    getDataToShare: {
        _id: 'b280a619-96f2-4324-8032-36e901bd8500',
        organizationLogo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ga4u70hblr4hbqhhpewgo9_Logo%20WIJeindhoven.png',
        organizationName: 'Gemeente X',
        name: 'Dhr. de Vries, Henk Willem',
        BSN: '12345678',
        verificationType: 'Bevestiging ondersteuning',
        status: 'active'
    },
    getSharedData: {
        _id: 'ef90736b-bcae-4c72-b55d-2cbc6dfd29f1',
        organizations: [
            {
                _id: '0925609e-84fc-44e3-96b7-e27140b5932f',
                type: 'organization',
                name: 'Centraal Justitieel Incassobureau',
                logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png'
            },
            // {
            //     _id: '007b8592-87cb-4057-bf33-2ee030dcf72a',
            //     type: 'organization',
            //     name: 'Belastingdienst',
            //     logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png'
            // }
        ],
        uploadDate: '2019-12-31T23:00:00.000Z',
        info: {
            _id: 'b280a619-96f2-4324-8032-36e901bd8500',
            organizationLogo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ga4u70hblr4hbqhhpewgo9_Logo%20WIJeindhoven.png',
            organizationName: 'Gemeente X',
            name: 'Dhr. de Vries, Henk Willem',
            BSN: '12345678',
            verificationType: 'Bevestiging ondersteuning',
            status: 'active'
        },
        trackingData: [
            {
                _id: 'fea443fa-f768-4017-bd7f-9a231dda0bf9',
                name: 'Centraal Justitieel Incassobureau',
                action: 'Gelezen',
                date: '2021-03-04T10:44:57.363Z'
            },
            {
                _id: '7ce632ac-be75-4057-8e87-45d82bf4583e',
                name: 'Jij',
                action: 'Gedeeld',
                date: '2021-03-04T10:44:57.363Z'
            }
        ]
    }
};

export const Documents_MOKE = {
    getDocuments: [
        {
            _id: 'ef90736b-bcae-4c72-b55d-2cbc6dfd29f1',
            type: 'data',
            name: 'Bevestiging ondersteuning',
            additionalName: 'Gemeente X',
            status: 'active'
        },
    ],
    getDocument: {
        _id: 'cab95eb3-7d12-4ef1-9425-abdf066d8be1',
        uploadDate: '2019-12-31T23:00:00.000Z',
        organizations: [
            {
                _id: '0925609e-84fc-44e3-96b7-e27140b5932f',
                type: 'organization',
                name: 'Centraal Justitieel Incassobureau',
                logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png'
            },
        ],
        info: {
            _id: 'b280a619-96f2-4324-8032-36e901bd8500',
            organizationLogo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ga4u70hblr4hbqhhpewgo9_Logo%20WIJeindhoven.png',
            organizationName: 'Gemeente X',
            name: 'Dhr. de Vries, Henk Willem',
            BSN: '12345678',
            verificationType: 'Bevestiging ondersteuning',
            status: 'active'
        }
    },
};


export const ChangingUserData_MOKE = {
    searchAddress: [
        {
            _id: '8f270b1a-d91c-4eb5-893f-9e1dd7e26b33',
            data: 'Pieter Breughelstraat 106, 5213BR \'s-Hertogenbosch'
        },
    ],
    getListPeople: [
        {
            _id: '285816d9-29c5-4dae-b981-50f58fb9f0ef',
            name: 'Dhr. de Vries, Henk Willem, geboren op',
            date: '2021-03-04T10:44:57.363Z'
        },
        {
            _id: '9df6408d-f119-44ae-b8d4-4e029566dd5d',
            name: 'Mvr. de Vries, Anita Henrika, geboren op',
            date: '2021-03-04T10:44:57.363Z'
        },
        {
            _id: 'df9fb442-1273-4c59-891d-612bc039c952',
            name: 'Dhr. de Vries, Jan Henrik, geboren op',
            date: '2021-03-04T10:44:57.363Z'
        },
    ]
};

export const Notification_MOKE = {
    getCount: {
        count: 1
    },
    getNotifications: [
        {
            _id: '7cb97859-e42b-44d3-8456-fa084f0ecb88',
            dataId: 'cab95eb3-7d12-4ef1-9425-abdf066d8be1',
            logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ga4u70hblr4hbqhhpewgo9_Logo%20WIJeindhoven.png',
            text: 'Gemeente X heeft een bevestiging naar jou gestuurd.',
            status: 'new',
            date: '2021-03-04T10:44:57.363Z'
        },
        // {
        //     _id: 'c008871f-1c30-4bba-a313-69882bc405c2',
        //     dataId: 'cab95eb3-7d12-4ef1-9425-abdf066d8be1',
        //     logo: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/fmwzkpl1tidouannndvozk_Logo%20Overheid.png',
        //     text: 'Je bevestiging ondersteuning is gelezen door Centraal Justitieel Incassobureau.',
        //     status: 'new',
        //     date: '2021-03-04T10:44:57.363Z'
        // }
    ]
};
