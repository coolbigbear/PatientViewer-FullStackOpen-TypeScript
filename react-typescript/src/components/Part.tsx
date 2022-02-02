import React from 'react';
import { CoursePart } from '../types';

export const Part = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case 'normal':
			return (
				<div>
					<strong>
						{part.name} {part.exerciseCount}
          </strong>
          <br></br>
					<em>{part.description}</em>
				</div>
			);
		case 'groupProject':
			return (
				<div>
					<strong>
						{part.name} {part.exerciseCount}
          </strong>
          <br></br>
					Project exercises: <strong>{part.groupProjectCount}</strong>
				</div>
			);
		case 'submission':
			return (
				<div>
					<strong>
						{part.name} {part.exerciseCount}
          </strong>
          <br></br>
          <em>{part.description}</em>
          <br></br>
					Submit to:
					<a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
				</div>
			);
		case 'special':
			return (
				<div>
					<strong>
						{part.name} {part.exerciseCount}
          </strong>
          <br></br>
          <em>{part.description}</em>
          <br></br>
					Required skills:
          {
            part.requirements.map((requirement) => 
              <> {requirement}</>
            )
          }
				</div>
			);
	}
};
