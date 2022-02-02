import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

export const HospitalCard = ({ entry }: { entry: HospitalEntry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date}
					<Icon name="hospital"></Icon>
				</Card.Header>
				<Card.Content>{entry.description}</Card.Content>
			</Card.Content>
			<Card.Content>
				<List bulleted items={entry.diagnosisCodes} />
			</Card.Content>
			<Card.Content>
                <p>Discharged: {entry.discharge.date}</p>
                <p>{entry.discharge.criteria}</p>
			</Card.Content>
		</Card>
	);
};
