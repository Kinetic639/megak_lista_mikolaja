import { ChildEntity } from './child.entity';
import { GiftEntity } from '../gift';

export type CreateChildReq = Omit<ChildEntity, 'id'>;
export type UpdateChildReq = Omit<ChildEntity, 'giftId'>;

export interface ListChildrenRes {
  childrenList: ChildEntity[];
  giftsList: GiftEntity[];
}

export interface SetGiftForChildReq {
  childId: string;
  giftId: string;
}
