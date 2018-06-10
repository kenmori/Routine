//React Native app entry point
import React from 'react'
//HybridAppとしているがその名前でexportしていない。動きを見るとどんな名前でもいい
import HybridApp from './src/App'
import { Router, Switch, Route, Link } from './src/Routing/Routing'

export default class  extends React.Component {
  render() {
    return (
      <HybridApp />
    )
  }
}
