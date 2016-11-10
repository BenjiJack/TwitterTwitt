import React, { Component, Image, Navigator } from 'react';
import { Container, Header, Icon, Title, Content, Card, CardItem, Text, Thumbnail, Button } from 'native-base';

var base64 = require('base-64');
var settings = require('./settings.json')

var main_user = settings.user
var key = settings.key
var secret = settings.secret
var keysecret = base64.encode(key + ":" + secret)

class TwittList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			handle: main_user,
			users: 	[],
			json: "",
			token: "",
			consumer_secret: secret.toString('base64'),
			consumer_key: key.toString('base64'),
		}

		fetch('https://api.twitter.com/oauth2/token', {
					method: 'POST',
					headers: {
						'Authorization': 'Basic ' + keysecret,
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					},
					body: 'grant_type=client_credentials',
				})
				.then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson)
					this.setState({
						token: responseJson.access_token,
					})

					console.log("TOKEN")
					console.log(this.state.token)

					fetch(`https://api.twitter.com/1.1/friends/list.json?screen_name=${this.state.handle}`, {
								method: 'GET',
								headers: {
									'Authorization': 'Bearer ' + this.state.token,
									'Accept': 'application/json',
								},
							})
							.then((response) => response.json())
							.then((responseJson) => {
								console.log(responseJson)
								this.setState({
									users: responseJson.users,
								})
							})
							.catch((error) => {
								console.error(error);
							});	
				})
				.catch((error) => {
					console.error(error);
				});
	};

	render() {
		return (
			<Card dataArray={this.state.users}
					renderRow={(user) =>
				<CardItem>                       
					<Text>{user.name}</Text>
					<Text note>{user.screen_name}</Text>
				</CardItem>
				}>
			</Card>
		);
	};
}

module.exports = TwittList;