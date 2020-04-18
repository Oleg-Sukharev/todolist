import React,{Component} from 'react';

import './item-add.css';

export default class  ItemAdd extends Component {
	constructor() {
		super();
		this.state = {
			label: ""
		}
	}
			
	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	onSubmit =(e) =>{
		e.preventDefault();
		const value = this.state.label.trim(); 
		if(value == false) return;
		this.props.onAdded(this.state.label);
		this.setState({
			label: ''
		});
	};

	render(){
		const { onAdded } = this.props;
		return (
			<form className="item-add__wr clearfix form-list d-flex"
				onSubmit={ this.onSubmit }>
				<input type="text"
					className="item-add__input form-control"
					placeholder='What need to be done'
					onChange={this.onLabelChange}
					value={this.state.label}
					/>
			    <button 
					type="submit" 
					className="btn btn-outline-success float-right item-add__btn">
			    	Add Item
			    </button>
			</form>
		);
	}
};

