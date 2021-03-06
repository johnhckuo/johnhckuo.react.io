import React from "react"
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactGA from 'react-ga';

import Aboutme from "../aboutme/main"
import Portfolio from "../portfolio/main"
import Experience from "../experience/main"
import Blog from "../blog/main"
import Index from "../index/main"
import * as Style from "./style"
import {Background, mobileWidth, BackgroundFilter} from "../global/style"

export default class Routes extends React.Component{

  constructor(props){
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.backgroundBlur = this.backgroundBlur.bind(this);
    this.logPageView = this.logPageView.bind(this);
    this.state = {init: false, blur: false, device: null};
    ReactGA.initialize('UA-108369170-1');
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({init : true})
    }, 2000)
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount(){
    this.setState({
      init:false
    })
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  backgroundBlur(blur){
    this.setState({
      blur
    })
  }

  updateWindowDimensions() {
    let device = window.innerWidth > mobileWidth ? "laptop" : "mobile";
    this.setState({ device })
  }

  logPageView(){
  		ReactGA.set({ page: window.location.hash });
      ReactGA.pageview(window.location.hash);
      return null;
  };

  render(){
    return (
        <Style.RootContainer>
            <Background blur={this.state.blur}/>
            <BackgroundFilter init={this.state.init}/>
            <Route path="/" component={this.logPageView} />
            <Switch>
                <Route exact path="/" render={
                  props=>
                    <Index {...props} blur={this.backgroundBlur} device={this.state.device} loaded={this.state.init}/>
                  }
                />
                <Route exact path="/aboutme" render={
                  props=>
                    <Aboutme {...props} device={this.state.device} />
                  }
                />
                <Route exact path="/experience" render={
                  props=>
                    <Experience {...props} device={this.state.device} />
                  }
                />
                <Route exact path="/portfolio" render={
                  props=>
                    <Portfolio {...props} />
                  }
                />
                <Route exact path="/blog/:id?" render={
                  props=>
                    <Blog {...props} device={this.state.device} />
                  }
                />
                <Route render={
                  props=>
                    <GenericNotFound {...props} />
                  }
                />
            </Switch>
        </Style.RootContainer>
    );
  }
}

const GenericNotFound = ()=>{
  alert("Page not found! Redirecting you to the main page...");
  return <Redirect to="/" />
}
