import { AuthActionCreators } from "./auth/actiion-creators";
import { EventActionCreators } from "./event/action-creators";

export const allActionCreators = {
	...AuthActionCreators,
	...EventActionCreators
}
