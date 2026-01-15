import { LikeEntity } from '@nearlyapp/common';

export type CreateDeleteLikeQueryParams = {
  postUuid: string;
};

export type CreateLikeResponse = LikeEntity;
export type DeleteLikeResponse = void;
