// types/lp.ts

/* ── 공통 하위 타입 ─────────────────────── */
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

/* ── 리스트용 항목 ─────────────────────── */
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

/* ── 리스트 API 응답 ────────────────────── */
export type LpDataDto = {
    data: LpItem[];
    nextCursor: number;
    hasNext: boolean;
};

export type ResponseLpDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: LpDataDto;
};

/* ── 상세 보기 항목 + 응답 ──────────────── */
export type LpDetailItem = LpItem & { author: Author };

export type ResponseLpDetailDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: LpDetailItem;
};
