export const UserData_MOKE = {
    _id: '_id',
    token: 'token',
    login: 'Login',
    firstName: 'Henk',
    lastName: 'de Vries',
    birthday: '13-04-1984',
    serviceNumber: '12345678',
    birthplace: 'Utrecht',
    countryBirth: 'Nederland',
    marriage: 'Evelien de Vries',
    children: 'Paul de Vries',
    avatar: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ou491rxps6feoxbndi1qt_84854.jpg'
};

export const SearchItems_MOKE = {
    default: [{
        _id: 'b405e62a-5aec-4f68-8538-e3b5c5713193',
        type: 'any',
        name: 'Ik ga verhuizen'
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
            {name: 'Centraal Justitieel Incassobureau', action: 'Gelezen', date: '2021-03-04T10:44:57.363Z'},
            {name: 'Jij', action: 'Gedeeld', date: '2021-03-04T10:44:57.363Z'}
        ]
    }
};
