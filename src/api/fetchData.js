export const searchOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b517131659mshb9b53049dc06d0bp1db4a0jsnce8361645c2e',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

export const fetchData = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}
