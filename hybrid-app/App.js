//React Native app entry point
import React from 'react'
import HybridApp from './src/App'
import { Router, Switch, Route, Link } from './src/Routing/Routing'

export default class NativeApp extends React.Component {
  render() {
    return <HybridApp />
  }
}
