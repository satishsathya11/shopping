import React, { Component } from 'react';
import items from "./items.json";

const styles = {
  button: {
     position: "fixed",
     bottom: "10%",
     right: "10%",
     color: "green",
     zoom: "1.5",
  },
  checkbox: {
    position: "relative",
    top: "30px",
    zoom: "1.5",
  },
  itemContainer: {
    display: "flex",
    border: "1px solid gray",
    borderRadius: "10px",
    margin: "10px",
    width: "30%",
  }
}

class ItemsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: [],
    }
  }
  handleChange = name => event => {
    this.setState({
      checkedItems: {
        ...this.state.checkedItems,
        [name]: event.target.checked,
      }
    })
  };
  
  render() {
    const { checkedItems } = this.state;
    return (
      <div>
        {items && items.map((i, key) =>
          <div key={key} style={styles.itemContainer}>
            <div style={{ padding: "10px" }}>
              <p>name : {i.name}</p>
              <p>price : ${i.price}</p>
              <p>weight : {i.weight}g</p>
            </div>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={checkedItems[i.name]}
              onChange={this.handleChange(i.name)}
              value={i.name}
            />
          </div>
        )}
        <button
          style={styles.button}
          onClick={() => this.props.handlePlaceOrder(checkedItems)}
        >
          Place Order
        </button>
      </div>
    );
  }
}

export default ItemsView;
