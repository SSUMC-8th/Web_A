export type lpDataDto = {
    data: [
        {
            id: number;
            title: string;
            content: string;
            thumbnail: string;
            published: boolean;
            authorId: number;
            createdAt: string;
            updatedAt: string;
            tags: [
                {
                    id: number;
                    name: string;
                },
            ];
            likes: [
                {
                    id: number;
                    userId: number;
                    lpId: number;
                },
            ];
        },
    ];
    nextCursor: number;
    hasNext: boolean;
};
export type ResponseLpDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: lpDataDto;
};
