import React, { Component } from 'react';

const styles = {
  container: {
    padding: "40px",
  }
}

class OrderView extends Component {
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
            <p>Courier price: {item.courierPrice}</p>
            <br />
          </div>)
        )}
      </div>
    );
  }
}

export default OrderView;
