import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  label: string;
  link: string;
}

export interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

interface MenusState {
  menus: Menu[];
  loading: boolean;
  error: string | null;
}

const initialState: MenusState = {
  menus: [
    {
      id: '1',
      name: 'Navbar menu',
      items: [
        { id: '1', label: 'Home', link: '/' },
        { id: '2', label: 'New', link: '/new' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  loading: false,
  error: null,
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<Omit<Menu, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newMenu: Menu = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.menus.push(newMenu);
    },
    updateMenu: (state, action: PayloadAction<Menu>) => {
      const index = state.menus.findIndex(menu => menu.id === action.payload.id);
      if (index !== -1) {
        state.menus[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteMenu: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.filter(menu => menu.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addMenu, updateMenu, deleteMenu, setLoading, setError } = menusSlice.actions;

// Selectors
export const selectAllMenus = (state: { menus: MenusState }) => state.menus.menus;
export const selectMenuById = (state: { menus: MenusState }, id: string) => 
  state.menus.menus.find(menu => menu.id === id);
export const selectMenusLoading = (state: { menus: MenusState }) => state.menus.loading;
export const selectMenusError = (state: { menus: MenusState }) => state.menus.error;

export default menusSlice.reducer;
