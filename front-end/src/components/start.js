import App from './app.js'
import {Link} from 'react-router-dom'
import React from 'react'

class Start extends React.Component {
  render() {
    return (
      <div>

      <div className="header-grid d-flex justify-content-center">
      <div className="row banner">
      <div className="col">
		  <div className="photo"><img src="https://makeup-api.herokuapp.com/assets/brushes-6d2ab84631ecd47ced4fa07c47eb37521eb61c5a525965dafaf308f21338aa44.png" height="262" width="393" alt="Brushes"></img></div>
	     <div className="photo bottom"><img src="https://makeup-api.herokuapp.com/assets/nail-polish-4c7ee1a5f7a5cbaff9757c3bcfa4f6e89d7a6f2ffc49d267e04e010ba94cfd7c.png" height="262" width="393" alt="Nail polish"></img></div>
      </div>

      <div className="col">
      <div class="photo photo-lips"><img src="https://makeup-api.herokuapp.com/assets/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png" height="536" width="393"alt="Lips"></img></div>
      </div>

      <div className="col">
       </div>

      </div>
      </div>
      <br></br>
      <div className="row d-flex justify-content-center">
      <div className="col-8 offset-7">
            <Link to='/shopping' className="text-info"><button type="button" className="btn btn-info">Start Shopping</button></Link>
            </div>
          </div>
          </div>
    )
  }
}

export default Start;
