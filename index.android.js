import React, { Component, Navigator } from 'react';
import { Container, Header, Icon, Title, Content, Card, CardItem, Text, Thumbnail, Button } from 'native-base';
import {
  AppRegistry,
} from 'react-native';

var TwittList = require('./twittlist.js')

export default class TwitterTwitt extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Button transparent>
						<Icon name='logo-twitter' />
					</Button>

					<Title>TwitterTwitt</Title>
					<Button transparent>
						<Icon name='ios-menu' />
					</Button>
				</Header>
					<Content>
					<TwittList/>
					</Content>
			</Container>
		);
	}
}

AppRegistry.registerComponent('TwitterTwitt', () => TwitterTwitt);
