import React, { Component, Image, Navigator } from 'react';
import { Container, Header, Icon, Title, Content, Card, CardItem, Text, Thumbnail, Button } from 'native-base';
import {
  AppRegistry,
} from 'react-native';

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
					<Card>
						<CardItem >                       
							<Text>NativeBase</Text>
							<Text note>April 15, 2016</Text>
						</CardItem>
						<CardItem cardBody>
							<Text>
								//Your text here
							</Text>
							<Button transparent textStyle={{color: '#87838B'}}>
								389 Stars
							</Button>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}

AppRegistry.registerComponent('TwitterTwitt', () => TwitterTwitt);
