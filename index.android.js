import React, { Component, Image, Navigator } from 'react';
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
						<Icon name='ios-arrow-back' />
					</Button>

					<Title>Header</Title>
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
