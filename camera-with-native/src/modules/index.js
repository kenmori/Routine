import {combineReducers} from 'redux'
import {counter}  from './counter'
import {photo}  from './photo'

export default combineReducers({ counter, photo })
