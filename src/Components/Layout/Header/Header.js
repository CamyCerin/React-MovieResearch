import { NavLink as RouterNavLink } from 'react-router-dom';

function Header() {
    return (
      <div className="App">
        
        <ul>
            <li>
                <RouterNavLink to='/'>Home</RouterNavLink>
            </li>
            <li>
                <RouterNavLink to='/details/1'>Details</RouterNavLink>
            </li>
        </ul>
      </div>
    );
  }
  
export default Header;