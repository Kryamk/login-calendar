import { EventActionEnam, EventActions, EventState } from "./types";

const initialState: EventState = {
	guests: [],
	events: []
}

export default function EventReducer(state = initialState, action: EventActions): EventState {
	switch (action.type) {
		case EventActionEnam.SET_GUESTS:
			return {...state, guests: action.payload}
		case EventActionEnam.SET_EVENTS:
			return {...state, events: action.payload}
		default:
			return state;
	}
}
