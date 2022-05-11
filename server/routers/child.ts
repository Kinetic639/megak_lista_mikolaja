import {Router} from "express";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {ValidationError} from "../utils/errors";
import {CreateChildReq, ListChildrenRes, SetGiftForChildReq} from "../types";

export const childRouter = Router();

childRouter // /children

    .get('/', async (req, res) => {
        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();

        res.json({
            childrenList,
            giftsList,
        } as ListChildrenRes);
    })

    .delete('/:id', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.id);

        if (!child) {
            throw new ValidationError('No such child.');
        }

        if (child.giftId) {
            throw new ValidationError('Remove gift from child, before deleting it.');
        }

        await child.delete();

        res.end();
    })

    .post('/', async (req, res) => {
        const newChild = new ChildRecord(req.body as CreateChildReq);
        await newChild.insert();

        res.json(newChild);
    })

    .patch('/gift/:childId', async (req, res) => {
        const {body}: {
            body: SetGiftForChildReq;
        } = req;

        const child = await ChildRecord.getOne(req.params.childId);

        if (child === null) {
            throw new ValidationError('Nie znaleziono dziecka z podanym ID.');
        }

        const gift = body.giftId === '' ? null : await GiftRecord.getOne(body.giftId);

        if (gift) {
            if (gift.count <= await gift.countGivenGifts()) {
                throw new ValidationError('Tego prezentu jest za mało.');
            }
        }

        child.giftId = gift?.id ?? null;
        await child.update();

        res.json(child);
    });
