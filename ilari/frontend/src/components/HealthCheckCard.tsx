import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import HealthRatingBar from './HealthRatingBar';

export const HealthCheckCard = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date}
					<Icon name="heartbeat"></Icon>
				</Card.Header>
				<Card.Content>{entry.description}</Card.Content>
			</Card.Content>
			<Card.Content>
				<HealthRatingBar rating={entry.healthCheckRating} showText={true} />
			</Card.Content>
			<Card.Content>
				<List bulleted items={entry.diagnosisCodes} />{' '}
			</Card.Content>
		</Card>
	);
};
