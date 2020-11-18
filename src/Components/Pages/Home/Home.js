import { search } from '../../../API';
import { useEffect, useState } from 'react';

let page = 1;

function Home() {

    const [result, setResult] = useState([])
    const [nbPage, setNbPage] = useState(1)

    useEffect(() => {
        getSearch(page);
    }, [])

    function getSearch () {
        console.log(page)
        search('breaking bad', page)
        .then(res=> {
            setResult(res.results);
            setNbPage(res.total_pages);
            console.log(res)
        })
        .catch(error => console.log(error))
    }


    function nextPage (number) {
        console.log(number)
        page = number;
        getSearch(page)
    }

    function getLink (number) {
        return <button key={number} className="btn btn-primary ml-2" disabled={number == page ? 'disabled' : null} onClick={() => {nextPage(number)}}>{number}</button>
    }

    function getNumberPage () {
        if (nbPage == 1) {
            return '';
        }
        
        var tab = [];

        for (var i = 1; i <= nbPage; i++) {
            tab.push(getLink(i));
            
        }
        return tab;

    }

    return (
      <div className="App">
        <h1>Home</h1>
        <ul>
            {result.map(item => 
                <li key={item.id}>{item.title}</li>
            )}
        </ul>
        <br/>
        {getNumberPage()}
      </div>
    );
  }
  
export default Home;