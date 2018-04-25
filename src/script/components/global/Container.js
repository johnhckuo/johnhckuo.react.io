import React from "react"
import {ContainerStyle, HomeBtnStyle, Title, HR} from "./style"
import { FaHome } from 'react-icons/lib/fa';

export default class Container extends React.Component{
	constructor(props){
		super(props);
    this.historyBack = this.historyBack.bind(this);
    this.state={
      init: false
    }
	}


	historyBack(){
		this.setState({init: false});
		setTimeout(()=>{
			this.props.history.goBack();
		}, 500)
	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({init: true});
		}, 500)
	}

	render(){
		return(
				<ContainerStyle active={this.state.init} type={this.props.type}>
          <HomeBtnStyle onClick = {this.historyBack} >
  					<FaHome />
  				</HomeBtnStyle>
          <Title>
            <h2>{this.props.FirstTitle}</h2>
            <HR />
						{
							this.props.SecondTitle ? <h3>{this.props.SecondTitle}</h3> : null
						}
          </Title>
					{this.props.children}
				</ContainerStyle>
		);
	}


}