import React, { Component } from 'react';
import { connect } from 'react-redux';


class VeganMakeUpList extends Component {

 renderVeganMakeUp (makeUpData) {
   let newMakeUpData = Object.values(makeUpData);
   // Filter the data to check for products that are vegan and not natural
   let vegan = makeUpData.filter(m => m.tag_list.includes("Vegan")&& !m.tag_list.includes("Natural"))
     return (

                vegan.map(m => (
                    <div className="col-3 makeup-item text-center" key={m.id}>
                      <img src={m.image_link} alt="" width="140" height="auto" className="rounded mx-auto d-block"></img>
                      <div className="item-name">{m.name}</div>
                      <div className="item-brand">{m.brand}</div>
                      <div className="price">${parseFloat(m.price).toFixed(2)}</div>
                      <button type="button" class="btn btn-outline-info"><a href={m.product_link} className="text-info">Buy it Now</a></button>
                      </div>

                ))



       )
      }

render() {
    return (
      <div id="second-main-view" className="container">
      <h1 id="vegan" className="text-left">Vegan Products</h1>
      <hr></hr>
        <div className="row d-flex ">
          {this.props.makeUp.map(this.renderVeganMakeUp)}
        </div>
        </div>
     );
  }
}

function mapStateToProps({ makeUp }) {
  console.log('makeup', {makeUp})
  return { makeUp };
}

export default connect(mapStateToProps)(VeganMakeUpList);
