import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'
export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async params => {
	const res = await axios.post('/auth/login', params)
	return res.data
})
export const fetchRegister = createAsyncThunk(
	'/auth/fetchRegister',
	async params => {
		const res = await axios.post('/auth/register', params)
		return res.data
	}
)
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
	const res = await axios.get('/auth/me')
	return res.data
})

const initialState = {
	data: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null
			state.status = 'loaded'
		},
	},
	extraReducers: {
		[fetchAuth.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.status = 'loaded'
			console.log(action.payload)
			state.data = action.payload
		},
		[fetchAuth.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
		[fetchAuthMe.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded'
			console.log(action.payload)
			state.data = action.payload
		},
		[fetchAuthMe.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
		[fetchRegister.pending]: state => {
			state.status = 'loading'
			state.data = null
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded'
			console.log(action.payload)
			state.data = action.payload
		},
		[fetchRegister.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
	},
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
