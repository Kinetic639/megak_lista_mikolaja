import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChildEntity, ListChildrenRes } from 'types';
import { SetGiftForChildReq, UpdateChildReq } from 'types';
import { toast } from 'react-toastify';

export const getChildrenAsync = createAsyncThunk(
  'children/getChildrenAsync',
  async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/children`);
    const data = await resp.json();

    return data;
  },
);

export const updateChildName = createAsyncThunk(
  'children/updateChildName',
  async (payload: UpdateChildReq, { rejectWithValue }) => {
    if (payload.name.length < 3 || payload.name.length > 55) {
      toast.error('New name must be between 3 and 55 characters long');
      return rejectWithValue(
        'New name must be between 3 and 55 characters long',
      );
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/children/${payload.id}`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          id: payload.id,
          name: payload.name,
        }),
      },
    );

    if ([400, 500].includes(res.status)) {
      const error = await res.json();
      toast.error(error.message);
      return rejectWithValue(error.message);
    }

    toast.success(`Changed name to ${payload.name}`);
    return payload;
  },
);

export const setGiftForChild = createAsyncThunk(
  'children/setGiftForChild',
  async (payload: SetGiftForChildReq, { rejectWithValue }) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/children/gift/${payload.childId}`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          giftId: payload.giftId,
        }),
      },
    );

    if ([400, 500].includes(res.status)) {
      const error = await res.json();
      toast.error(error.message);
      return rejectWithValue(error.message);
    }

    toast.success(`Successfully changed gift.`);
    return payload;
  },
);

export const addChildAsync = createAsyncThunk(
  'gifts/addChildAsync',
  async (payload: ChildEntity, { dispatch }) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/children`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: payload.name, giftId: payload.giftId }),
    });

    if (res.ok) {
      const child = await res.json();

      toast.success(`Child ${payload.name}  has been added.`);
      return child;
    }
  },
);

export const deleteChildAsync = createAsyncThunk(
  'children/deleteGiftAsync',
  async (payload: ChildEntity, { rejectWithValue }) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/children/${payload.id}`,
      {
        method: 'DELETE',
      },
    );
    if ([400, 500].includes(res.status)) {
      const error = await res.json();
      toast.error(error.message);
      return rejectWithValue(error.message);
    }

    toast.success(`Child ${payload.name}  has been deleted.`);
    return payload.id;
  },
);

interface ChildrenSliceState {
  children: ListChildrenRes;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChildrenSliceState = {
  children: {
    childrenList: [],
    giftsList: [],
  },
  status: 'idle',
  error: null,
};

export const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChildrenAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getChildrenAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.children = action.payload;
      })
      .addCase(getChildrenAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(addChildAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addChildAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.children.childrenList.push(action.payload);
      })
      .addCase(addChildAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(setGiftForChild.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setGiftForChild.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const objIndex = state.children.childrenList.findIndex(
          (obj) => obj.id === action.payload.childId,
        );
        state.children.childrenList[objIndex].giftId = action.payload.giftId;
      })
      .addCase(setGiftForChild.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteChildAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteChildAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.children.childrenList.findIndex(
          (child) => child.id === action.payload,
        );
        if (index !== -1) state.children.childrenList.splice(index, 1);
      })
      .addCase(deleteChildAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateChildName.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateChildName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const child = state.children.childrenList;
        const objIndex = child.findIndex((obj) => obj.id === action.payload.id);
        child[objIndex].name = action.payload.name;
      })
      .addCase(updateChildName.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default childrenSlice.reducer;
