import request from 'request';
import http from 'http';
import Table from 'cli-table';

const hostname = '127.0.0.1';
const port = 3000;


/**
 * This function will call a GET request on the API endpoint 
 * and sort the JSON entries on the basis of id
 * @param {String} endpoint
 */
const getDataFromAPI = (endpoint = "https://jsonplaceholder.typicode.com/users") => {
  const requestOptions = {
    method: 'GET',
    url: endpoint,
    json: true 
  }

  request.get(requestOptions, (err, response, body) => {
      try {
        handleErrors(response)
        body.sort((a, b) => a.id - b.id); 
        printTable(body);   
      } catch {
        console.error(response.statusCode)
      }
    });    
  }


  /**
   * Check's whether the HTTP response’s status code is in the successful range or not.
   * @param {Object} response 
   * @returns Resposne Object if the response status is OK (200-299)
   */
  const handleErrors = (response) => {
    if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new Error(response.statusText);
    }
    return response;
}
  /**
   * This function will print the given data in a tabular format
   * @param {Object} dataFetchedFromAPI 
   */
  const printTable = (dataFetchedFromAPI) => {
    const dataTable = new Table({
      head : ["ID", "Title"]
    });

    dataFetchedFromAPI.map(item => {
        dataTable.push([item["id"], item["name"]])
    })

    console.log(dataTable.toString())
  }

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Assignment 2');
});


server.listen(port, hostname, () => {
  getDataFromAPI();
});