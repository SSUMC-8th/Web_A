export type Tag = { id: number; name: string };
export type Like = { id: number; userId: number; lpId: number };
export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type LpItem = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Like[];
};

export type LpDataDto = {
    data: LpItem[];
    nextCursor: number | null;
    hasNext: boolean;
};

export type ResponseLpDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: LpDataDto;
};

export type LpDetailItem = LpItem & { author: Author };

export type ResponseLpDetailDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: LpDetailItem;
};

export type CommentAuthor = Author;
export type CommentItem = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: CommentAuthor;
};

export type CommentDataDto = {
    data: CommentItem[];
    nextCursor: number | null;
    hasNext: boolean;
};

export type ResponseCommentDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: CommentDataDto;
};
