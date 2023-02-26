import { Button, Layout, Modal, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'


const Event: FC = () => {
	const { fetchGuests, createEvent, fetchEvents } = useActions()
	const { guests, events } = useTypedSelector(state => state.event)
	const { user } = useTypedSelector(state => state.auth)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => { setIsModalOpen(true); }
	const closeModal = () => { setIsModalOpen(false); }

	useEffect(() => {
		fetchGuests();
		fetchEvents(user.username);
	}, [])

	const addNewEvent = (event: IEvent) => {
		createEvent(event)
		setIsModalOpen(false)
	}


	return (
		<Layout>
			{/* {JSON.stringify(events)} */}
			<EventCalendar events={events} />
			<Row justify='center'>
				<Button type='primary' onClick={showModal}>Добавить событие</Button>

			</Row>
			<Modal title="Добавление события" open={isModalOpen} onCancel={closeModal} footer={null}>
				<EventForm guests={guests} submit={addNewEvent} />
			</Modal>
		</Layout>
	)
}

export default Event
