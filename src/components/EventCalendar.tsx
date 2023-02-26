import React, { FC } from 'react'
import { Calendar } from 'antd';
import { IEvent } from '../models/IEvent';
import { formatDate } from '../utils/date';
import { Dayjs } from 'dayjs'

interface EventCalendarProps {
	events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
	const dateCellRender = (value: Dayjs) => {
		const formateDate = formatDate(value.toDate());
		const currentDayEvents = props.events.filter(ev => ev.date === formateDate)
		return (
			<div>
				{currentDayEvents.map((ev, i) =>
					<div key={i}>{ev.description}</div>
				)}
			</div>
		);
	};
	return (
		<Calendar dateCellRender={dateCellRender} />
	)
}

export default EventCalendar
