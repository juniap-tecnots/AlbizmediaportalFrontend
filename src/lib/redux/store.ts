
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import categoriesReducer from './slices/categoriesSlice';
import mediaReducer from './slices/mediaSlice';
import rolesReducer from './slices/rolesSlice';
import permissionsReducer from './slices/permissionsSlice';
import accountsReducer from './slices/accountsSlice';
import hierarchyReducer from './slices/hierarchySlice';
import workflowReducer from './slices/workflowSlice';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import workflowQueueReducer from './slices/workflowQueueSlice';
import workflowTemplatesReducer from './slices/workflowTemplatesSlice';
import workflowAuditReducer from './slices/workflowAuditSlice';
import contractsReducer from './slices/contractsSlice';
import profileCardsReducer from './slices/profileCardsSlice';
import subscriptionPlansReducer from './slices/subscriptionPlansSlice';
import placesReducer from './slices/placesSlice';
import eventsReducer from './slices/eventsSlice';
import foodsReducer from './slices/foodsSlice';
import slaReducer from './slices/slaSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['media', 'articles', 'places', 'events', 'foods'], // Prevent large slices from being persisted
};

const rootReducer = combineReducers({
  articles: articlesReducer,
  categories: categoriesReducer,
  media: mediaReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  accounts: accountsReducer,
  hierarchy: hierarchyReducer,
  workflow: workflowReducer,
  users: usersReducer,
  auth: authReducer,
  workflowQueue: workflowQueueReducer,
  workflowTemplates: workflowTemplatesReducer,
  workflowAudit: workflowAuditReducer,
  contracts: contractsReducer,
  profileCards: profileCardsReducer,
  subscriptionPlans: subscriptionPlansReducer,
  places: placesReducer,
  events: eventsReducer,
  foods: foodsReducer,
  sla: slaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
