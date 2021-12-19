from prettytable import PrettyTable
import requests 

def getDataFromAPI(endpoint = "https://jsonplaceholder.typicode.com/users/"):
    """ 
        This function will call a GET request on the provided API endpoint
    """
    try:
        dataFetchedFromAPI = requests.get(endpoint)
        dataFetchedFromAPI.raise_for_status()
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
    except requests.exceptions.RequestException as err:
        print ("Something went wrong..",err)
    else:
        return dataFetchedFromAPI


def printData(dataFetchedFromAPI):
    """
        This function prints the JSON entries in a tabular format
    """
    dataTable = PrettyTable(["Id", "Title"])
    for i in dataFetchedFromAPI:
        dataTable.add_row([i["id"], i["name"]])
    print(dataTable)

def main():
    """
        Gets the response json and sorts it in ascending order of the column 'id'
    """
    data = getDataFromAPI()
    if(data != None):
        responseJSON = data.json()
        responseJSON.sort(key=lambda x: x["id"])
        printData(responseJSON)
    elif(data == None):
        try:
            raise ValueError("Response object found to be None")
        except ValueError as err:
            print(err)

if __name__ == '__main__':
    main()

