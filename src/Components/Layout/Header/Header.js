import { NavLink as RouterNavLink, Redirect } from 'react-router-dom';


function Header() {
    
    function getResult(e) {
        e.preventDefault();
        var value = e.target.querySelector('input').value;
        
        if (value.trim() == '') {
            return
        }

        // let location = {
        //     pathname
        // }

        // <Redirect to={location}/>
    }
    
    return (
      <div className="App">
        
        <ul>
            <li>
                <RouterNavLink to='/'>Home</RouterNavLink>
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
  
export default Header;