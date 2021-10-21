import React from 'react'
import { Home ,Cart,PNF,Register} from "../pages"
import { Switch, Route } from "react-router-dom"
export default function Index() {
    return (
        <Switch>
            <Route exact path="/menu" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/" component={Register} />
            <Route exact path="/*" component={PNF} />
            
        </Switch>
    )
}
