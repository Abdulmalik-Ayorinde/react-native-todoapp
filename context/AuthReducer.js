export const initialState = {
	token: '',
	isLoggedIn: false,
	user: {},
};

export default function reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: payload.token,
				isLoggedIn: true,
			};
		case 'CLEAR_TOKEN':
			return {
				...state,
				token: payload.token,
				isLoggedIn: false,
			};
		default:
			throw new Error();
	}
}
