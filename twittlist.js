import React, { Component, Image, Navigator } from 'react';
import { Container, Header, Icon, Title, Content, Card, CardItem, Text, Thumbnail, Button } from 'native-base';

var Buffer = require('buffer/').Buffer

class TwittList extends Component {
	constructor(props) {
		super(props);

		var sec = new Buffer(Math.random())
		var key = new Buffer(Math.random())

		this.state = {
			users: 	[
						{
							name: "BEJ",
							profile: "prof",
						},
					],
			consumer_secret: sec.toString('base64'),
			consumer_key: key.toString('base64'),
		}
	};

	render() {
		return (
			<Card dataArray={this.state.users}
					renderRow={(user) =>
				<CardItem>                       
					<Text>{user.name}</Text>
					<Text note>{user.profile}</Text>
				</CardItem>
				}>
			</Card>
		);
	};
}

module.exports = TwittList;