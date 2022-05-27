import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateGiftReq, GiftEntity, UpdateGiftReq } from 'types';
import { toast } from 'react-toastify';

export const getGiftsAsync = createAsyncThunk(
  'gifts/getGiftAsync',
  async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/gifts`);
    const data = await resp.json();
    const gifts = data.giftsList;
    return gifts;
  },
);

export const getSingleGiftAsync = createAsyncThunk(
  'gifts/getSingleGiftAsync',
  async (payload: string) => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/gifts/${payload}`);
    const gift = await resp.json();
    return gift;
  },
);

export const addGiftAsync = createAsyncThunk(
  'gifts/addGiftAsync',
  async (payload: CreateGiftReq) => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/gifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: payload.name, count: payload.count }),
    });

    if (resp.ok) {
      const gift = await resp.json();
      toast.success(`Gift ${payload.name}  has been added.`);
      return gift;
    }
  },
);

export const deleteGiftAsync = createAsyncThunk(
  'gifts/deleteGiftAsync',
  async (payload: GiftEntity, { rejectWithValue, dispatch }) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/gifts/${payload.id}`,
      {
        method: 'DELETE',
      },
    );
    if ([400, 500].includes(res.status)) {
      const error = await res.json();
      toast.error(error.message);
      return rejectWithValue(error.message);
    }

    toast.success(`Gift ${payload.name}  has been deleted.`);
    return payload.id;
  },
);

export const updateGiftAsync = createAsyncThunk(
  'gifts/updateGiftAsync',
  async (payload: UpdateGiftReq, { rejectWithValue, dispatch }) => {
    const giftResp = await fetch(`${process.env.REACT_APP_API_URL}/gifts/${payload.id}`);
    const gift = await giftResp.json();
    const { id, name, count } = gift.gift;

    if (id === payload.id && name === payload.name && count === payload.count) {
      toast.info(`No changes have been made to gift ${payload.name}`);
      return rejectWithValue(payload);
    } else if (payload.count < gift.givenCount) {
      toast.error(`No enough`);
      return rejectWithValue(payload);
    } else {
      await fetch(
        `${process.env.REACT_APP_API_URL}/gifts/update/${payload.id}`,
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({
            id: payload.id,
            name: payload.name,
            count: payload.count,
          }),
        },
      );
      toast.success(`Successfully edited gift ${payload.name}`);
    }
    return payload;
  },
);

interface GiftsSliceState {
  gifts: GiftEntity[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GiftsSliceState = {
  gifts: [],
  status: 'idle',
  error: null,
};

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGiftsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGiftsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gifts = action.payload;
      })
      .addCase(getGiftsAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(addGiftAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addGiftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gifts.push(action.payload);
      })
      .addCase(addGiftAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteGiftAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteGiftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.gifts.findIndex(
          (gift) => gift.id === action.payload,
        );
        if (index !== -1) state.gifts.splice(index, 1);
      })
      .addCase(deleteGiftAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateGiftAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateGiftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const objIndex = state.gifts.findIndex(
          (obj) => obj.id === action.payload.id,
        );
        state.gifts[objIndex] = { ...action.payload };
      })
      .addCase(updateGiftAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(getSingleGiftAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSingleGiftAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(getSingleGiftAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default giftsSlice.reducer;
