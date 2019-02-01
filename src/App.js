import React, { Component } from 'react';
import './App.css';
import ItemsView from "./itemsView.jsx";
import OrderView from "./orderView.jsx";
import items from "./items.json";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderPlaced: false,
      packages: [],
    }
  }

  handlePlaceOrder = (checkedItems) => {
    let packages = [];
    const selectedItems = items.filter((i) => checkedItems[i.name])
      .sort((a, b) => a.price - b.price);
    const totalCost = selectedItems.reduce((acc, i) => acc + i.price, 0);
    const totalWeight = selectedItems.reduce((acc, i) => acc + i.weight, 0);
    const numOfAvgPackages = Math.ceil(totalCost/250);
    const avgWeightPerPackage = totalWeight/numOfAvgPackages;
    for(let j=0; j < selectedItems.length; j++) {
      let currentItem = selectedItems[j];
      let isItemPlaced = false;

      if (packages.length) {
        for(let i=0;i<packages.length;i++){
          const temptotal = packages[i].totalPrice + currentItem.price;
          const tempWeight = packages[i].totalWeight + currentItem.weight;
          if((temptotal < 250) && (tempWeight < avgWeightPerPackage)) {
            packages[i].items.push(currentItem);
            packages[i].totalPrice = temptotal;
            packages[i].totalWeight = tempWeight;
            isItemPlaced = true;
            break;
          }
        }
      }
      if(!isItemPlaced) {
        packages.push({
          name: `package ${packages.length + 1}`,
          items: [currentItem],
          totalPrice: currentItem.price,
          totalWeight: currentItem.weight,
        })
      }
    }
    this.setState({
      isOrderPlaced: true,
      packages: packages,
    })
  }

  render() {
    const { packages, isOrderPlaced } = this.state;
    return (
      <div className="App">
        {!isOrderPlaced ? (
          <ItemsView handlePlaceOrder={this.handlePlaceOrder} />) :
        (<OrderView packages={packages}/>)
        }
      </div>
    );
  }
}

export default App;
