export const searchOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2e3698912fmsh05b5795bb64bfedp1bf372jsn9e991a24ced2',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

export const fetchData = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}
