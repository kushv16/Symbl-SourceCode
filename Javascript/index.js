/**
 *  Check's whether the HTTP response’s status code is in the successful range or not.
 * @param {Object} response 
 * @returns Resposne Object if the response status is OK (200-299)
 */
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/**
 * Fetch data from the API endpoint and sort the JSON Output in ascending order of the key "id"
 * @param {String} endpoint 
 */

const getDataFromAPI = (endpoint = "https://jsonplaceholder.typicode.com/users") => {
    fetch(endpoint)
      .then(handleErrors)
      .then(response => response.json())
      .then((outputJSON) => {
        outputJSON.sort((a, b) => a.id - b.id);
        //print the sorted data in a tabular format in the browser console
        console.table(outputJSON)
      })
      .catch(err => console.log(err))
  }

  getDataFromAPI();