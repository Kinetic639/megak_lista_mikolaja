import { GiftEntity } from './gift.entity';

export type CreateGiftReq = Omit<GiftEntity, 'id'>;

export interface GetSingleGiftRes {
  gift: GiftEntity;
  givenCount: number;
}

export type UpdateGiftReq = GiftEntity;
