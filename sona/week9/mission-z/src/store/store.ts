import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice";
import modalReducer from "../slices/modalSlice";

//저장소를 생성함
function createStore() {
  const store = configureStore({
    //reducer 생성함'
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

//store를 활용하도록 내보내야함
//여기서 실행해서 스토어를 빼줌

const store = createStore();
export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
