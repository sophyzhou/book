class Footer extends React.Component {

  render(){
    return (
      <nav>
        <footer class="page-footer" style="background-color: black; opacity:0.6">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Help Hungry Asian Grow</h5>
                <p class="grey-text text-lighten-4">We hope you have enjoyed using Hungray Asian! If you feel Hungry Asian has made your life colorful and want to support us, send us over a donation! Any amount would help support and continue development on this project and is greatly appreciated.</p>
                <button class="btn waves-effect waves-orange orange lighten-3" type="submit" name="action" alt="PayPal - The safer, easier way to pay online!">Donate Now</button>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Connect</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.twitter.com">Twitter</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.google.com">G+</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.youtube.com">Youtube</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container"><center>
            © 2016-2017 Hungray Asian, All rights reserved
            </center>
            </div>
          </div>
        </footer>
      </nav>
    );
  }

}
MyComponents.Footer = Footer




 