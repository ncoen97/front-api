const addCurso = curso => ({
	type: 'ADDCURSO',
	payload: curso
})

const dropCurso = curso => ({
	type: 'DROPCURSO',
	payload: curso
})

const updateCurso = curso => ({
	type: 'UPDATECURSO',
	payload: curso
})

const addAlumno = (curso,alumno) => ({
	type: 'ADDALUMNO',
	payload: {
		curso,
		alumno
	}
})
const Actions = {
	addCurso, dropCurso, updateCurso
}
export default Actions


/*
export const userPostFetch = user => {
	return dispatch => {
		return fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				username: user.username,
				password: user.password
			})
		})
		.then(resp => resp.json())
		.then(data => {
			console.log(data.message)
			return data
		})
	}
  }
  export const userLoginFetch = user => {
	return dispatch => {
		return fetch("http://localhost:8000/users/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				username: user.username,
				password: user.password
			})
		})
		.then(resp => resp.json())
		.then(data => {
			console.log(data)
			if (data.message!=="Error en la authentication") {
				localStorage.setItem("token", data.token)
				dispatch(login(data.msg))
				return data
			}
		})
	}
  }*/