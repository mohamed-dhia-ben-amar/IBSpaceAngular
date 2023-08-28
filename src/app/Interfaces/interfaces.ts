export interface Country {
    id: string;
    name: string;
    logo: string;
    code: string;
    codeTel: string;
    nbrUsers: number;
}

export interface Post {
    id: string,
    owner: {
        idOwner: string,
        idCommun: string,
        role: number,
        displayName: string,
        picture: string,
        subDomain: [
            string
        ]
    },
    postIn: {
        idCountry: string,
        idProfil: string
    },
    createdAt: string,
    idSharedPost: string,
    sharedPost: string,
    ads: string,
    body: string,
    oldBody: [],
    idsUserLike: [
        string
    ],
    idsUserFavourite: [],
    preview: string,
    idEvent: string,
    eventPost: string,
    mediaCategory: {
        mediaImg: [
            {
                url: string
            }
        ],
        mediaVideo: [],
        others: []
    }
    numberLike: number,
    numberComment: number,
    isFavorite: boolean,
    isLiked: boolean,
    comments: [string],
    isModifed: boolean
    //LinkPreview Attributs
    title: string,
    description: string,
    image: string,
    url: string
}

export interface Comment {
    id: string,
    idUser: string,
    idPost: string,
    user: {
        id: string,
        displayName: string,
        picture: string
    },
    body: string,
    isModified: boolean,
    oldComment: [string],
    createdAt: string,
    mediaCategory: string
}