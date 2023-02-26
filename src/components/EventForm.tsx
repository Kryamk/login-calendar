import React, { FC, useState } from 'react'
import { Button, DatePicker, DatePickerProps, Form, Input, Row, Select } from 'antd'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { rules } from '../utils/rules'
import { formatDate } from '../utils/date'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface EventFormProps {
	guests: IUser[];
	submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
	const [event, setEvent] = useState({ author: '', date: '', description: '', guest: '' } as IEvent);
	const { user } = useTypedSelector(state => state.auth)

	// const selectDate = (date: Moment | null) => {
	// 	console.log(date)
	// }
	const selectDate: DatePickerProps['onChange'] = (date, dateString) => {
		// console.log(date, dateString);
		if (date) {
			// console.log(date.toDate())
			// console.log(date.format('YYYY.MM.DD'))
			// console.log(formatDate(date.toDate()))
			setEvent({ ...event, date: formatDate(date.toDate()) })
		}
	};

	const submitForm = () => {
		props.submit({ ...event, author: user.username })
	}


	return (
		<Form onFinish={submitForm}>
			<Form.Item label="Описание события" name="description" rules={[rules.required()]} >
				<Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
			</Form.Item>

			<Form.Item
				label="Дата события"
				name="data"
				rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}
			>
				{/* <DatePicker onChange={date =>selectDate(date)} /> */}
				<DatePicker onChange={selectDate} />
			</Form.Item>

			<Form.Item
				label="Выберите гостя"
				name="guest"
				rules={[rules.required()]}
			>
				<Select onChange={(guest: string) => setEvent({ ...event, guest })}>
					{props.guests.map((guest, i) =>
						<Select.Option key={i} value={guest.username}>{guest.username}</Select.Option>
					)}
				</Select>
			</Form.Item>

			<Row justify='end'>
				<Form.Item>
					<Button type='primary' htmlType='submit' > Создать </Button>
				</Form.Item>
			</Row>
		</Form>
	)
}

export default EventForm
