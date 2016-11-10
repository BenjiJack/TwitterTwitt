import React, { Component, Navigator } from 'react';
import { Image } from 'react-native';
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
			users: 	[
						{
							'name': 'test',
							'screen_name': 'test',
							'description': 'test description',
						},
						{
							'name': 'test2',
							'screen_name': 'test2',
							'description': 'test description2',
						},
					],
			data: [],
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
		
		var cards = this.state.users.map(function(user, i){
			
			if (user.status) {
				status = <CardItem cardBody key={i+4}>
							<Text>{user.status.text}{"\n"}
							{user.status.created_at}
							</Text>
						</CardItem>
			} else {
				status = <CardItem cardBody><Text>{"\n"}{"\n"}{"\n"}</Text></CardItem>;
			}

			return  (
				<Content key={i}>
					<CardItem key={i+1}>
						<Thumbnail source={{uri: user.profile_image_url_https}} />                       
						<Text style={{fontWeight: 'bold'}}>{user.name}</Text>
						<Text note>@{user.screen_name}</Text>
					</CardItem>
					<CardItem key={i+2}>
						<Text>{user.description}</Text>
					</CardItem>
					<CardItem key={i+3}>
						<Image style={{ resizeMode: 'cover' }} source={{uri: user.profile_banner_url + "/mobile_retina" }} /> 
					</CardItem>
					{status}
				</Content>

			);
		});

		return (
			<Card>
				{cards}
			</Card>
		);
	};
}

module.exports = TwittList;