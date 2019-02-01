import React, { Component } from 'react';

const styles = {
  container: {
    padding: "40px",
  }
}

class OrderView extends Component {
  getCourierCharge(weight) {
    if ((weight > 0) || (weight < 200)) {
      return "5";
    } else if((weight > 200) || (weight < 500)){
      return "10";
    } else if((weight > 500) || (weight < 1000)){
      return "15";
    } else if((weight > 1000) || (weight < 5000)){
      return "20";
    }
  }
  render() {
    const { packages } = this.props;
    return (
      <div style={styles.container}>
        {packages && packages.map((item, key) =>
          (<div key={key}>
            <h1>{item.name}</h1>
            <p>items : {item.items.map((i) => i.name).toString()}</p>
            <p>Total weight: {item.totalWeight}</p>
            <p>Total price: {item.totalPrice}</p>
            <p>Courier Charges: ${this.getCourierCharge(item.totalWeight)}</p>
            <br />
          </div>)
        )}
      </div>
    );
  }
}

export default OrderView;
