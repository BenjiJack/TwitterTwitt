import React, { Component, Navigator } from 'react';
import { Image } from 'react-native';
import { Container, Header, Icon, Title, Content, Card, CardItem, Text, Thumbnail, Button, List, ListItem } from 'native-base';

var base64 = require('base-64');
var settings = require('./settings.json')

var main_user = settings.user
var key = settings.key
var secret = settings.secret
var keysecret = base64.encode(key + ":" + secret)

// http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

class TwittList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			handle: main_user,
			friend_ids: "",
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

		// Get Access Token
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

					// Fetch friends of primary user
					fetch(`https://api.twitter.com/1.1/friends/ids.json?screen_name=${this.state.handle}`, {
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
									// Choose N random IDs from IDs returned
									friend_ids: getRandomSubarray(responseJson.ids, 50),
								})

										// Fetch user data for those random IDs
										fetch(`https://api.twitter.com/1.1/users/lookup.json?user_id=${this.state.friend_ids.toString()}`, {
										method: 'GET',
										headers: {
											'Authorization': 'Bearer ' + this.state.token,
											'Accept': 'application/json',
										},
									})
									.then((response) => response.json())
									.then((responseJson) => {
										console.log(responseJson)
										
										// Save resulting user data for those random IDs
										this.setState({
											users: responseJson,
										})
										
									})
									.catch((error) => {
										console.error(error);
									});	

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
			
			if (user.description) {
				description = <CardItem key={i+2}>
								<Text style={{fontStyle: 'italic'}}>{user.description}</Text>
							</CardItem>
			} else {
				description = null;
			}

			if (user.profile_banner_url) {
				banner = <CardItem key={i+3}>
							<Image style={{ resizeMode: 'cover' }} source={{uri: user.profile_banner_url + "/mobile_retina" }} />
						</CardItem>
			} else {
				banner = null;
			}

			if (user.status) {
				status = <CardItem key={i+4}>
							<Text>{user.status.text}{"\n"}
								{user.status.created_at} / RT {user.status.retweet_count} / FV {user.status.favorite_count}
							</Text>
						</CardItem>
			} else {
				status = null;
			}

			return  (
				<Content key={i}>
					<CardItem key={i+1}>
						<Thumbnail source={{uri: user.profile_image_url_https}} />                       
						<Text style={{fontWeight: 'bold'}}>{user.name}</Text>
						<Text note>@{user.screen_name}</Text>
					</CardItem>
					{description}
					{status}
					{banner}
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