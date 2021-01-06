/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-20 22:59:20
 * @Description: store config
 */
import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appReducer } from './reducers/app.reducer'
import { tagsViewReducer } from './reducers/tagsView.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  tagsView: tagsViewReducer
})

export type StoreState = ReturnType<typeof rootReducer>

const middleware: Middleware[] = [reduxThunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(reduxLogger)
}

// export default function configureStore() {
//   const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
//   return store
// }

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
