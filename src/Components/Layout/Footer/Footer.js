import facebookico from "../../../assets/facebook.svg";
import instagramico from "../../../assets/instagram.svg";
import twitterico from "../../../assets/twitter.svg";
import logoico from "../../../assets/logo.svg";

function Footer() {
  return (
    <div className="App">
      <div class="footer">
        <div class="container">
          <div class="logo_footer">
            <img src={logoico} alt="logo"></img>
          </div>
          <div class="links">
            <p>HOME</p>
            <p>CONTACT</p>
            <p>FILMS</p>
          </div>

          <div class="contact">
            <img class="img_social" src={facebookico} alt="facebook icon"></img>
            <img
              class="img_social"
              src={instagramico}
              alt="instagram icon"
            ></img>
            <img class="img_social" src={twitterico} alt="twitter icon"></img>
          </div>
        </div>
        <div class="links_mobile">
          <p>HOME</p>
          <p>CONTACT</p>
          <p>FILMS</p>
        </div>
        <div class="text_footer">
          <p>
            Designed with 💛<br></br>
            by Camille, Imene, Nastia and Oliwia
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
