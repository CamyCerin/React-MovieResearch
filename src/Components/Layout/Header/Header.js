import { withRouter } from "react-router-dom";

function Header({ history }) {
    
    function getResult(e) {
        e.preventDefault();
        var value = e.target.querySelector('input').value;
        
        if (value.trim() === '') {
            return
        }
        e.target.querySelector('input').value = ""
        history.push('/results?q='+value.trim());
    }
    
    function handleLink(e, link){
        e.preventDefault()
        history.push(link)
    }

    return (
      <div className="App">
        
        <ul>
            <li>
                <a href='' onClick={(e) => handleLink(e,'/')}>Home</a> | 
                <a href='' onClick={(e) => handleLink(e,'/results?categories=popular')}>Populaires</a> |
                <a href='' onClick={(e) => handleLink(e,'/results?categories=top_rated')}>Les mieux notés</a>|
                <a href='' onClick={(e) => handleLink(e,'/results?categories=upcoming')}>A venir</a>
            </li>
            <li>
                <form onSubmit={getResult}>
                        <div className="row">
                            <div className="form-group col-8">
                                <input className="form-control" type="search" placeholder="Rechercher"/>
                            </div>
                        </div>
                </form>
            </li>
        </ul>
      </div>
    );
  }
  
export default withRouter(Header);