class Product extends React.Component {

  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
    this.state = {qty: 0};
  }

  buy() {

   this.setState({qty: this.state.qty + 1});
   this.props.handleTotal(this.props.price);
  }

  show () {
    this.props.handleShow(this.props.name2);
  }

  render() {
    return (
      <div>
        <p>{this.props.name2} - ${this.props.price}</p>
        <button onClick = {this.buy}>Buy</button>
        <button onClick = {this.show}>Show</button>
        <h3>QTY: {this.state.qty} item(s)</h3>
        <hr/>
      </div>
    );
  }
}

class Total extends React.Component {
  render() {
    return (
      <div>
        <h3>Total Cash: ${this.props.total} </h3>
      </div>
    );
  }
}

class ProductForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    //alert("Name: " + this.refs.name2.value + " - $" + this.refs.price.value);

    let product = {
      name2: this.refs.name2.value,
      price: parseInt(this.refs.price.value) || 0
    }

    this.props.handleCreate(product);

    this.refs.name2.value = "";
    this.refs.price.value = "";
  }


  render() {
    return (
      <form onSubmit = {this.submit} >
        <input type="text" placeholder="Product Name" ref="name2" />
         -
        <input type="text" placeholder="Product Price" ref="price" />
        <br/><br/>
        <button>Create Product</button>
        <hr/>
      </form>
    );
  }
}

class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      productList: [
        {name2: "Android", price: 100},
        {name2: "iPhone", price: 350},
        {name2: "CarterMobile", price: 500}
        ]
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  calculateTotal(price) {
    this.setState({total: this.state.total + price})

  }

  showProduct(name) {
    alert("you selected " + name);
  }

  createProduct(product) {
    this.setState({
      productList: this.state.productList.concat(product)
    });
  }

  render() {

    let component = this;
    let products = this.state.productList.map(function(product) {
      return (
        <Product name2={product.name2} price={product.price} handleShow={component.showProduct} handleTotal={component.calculateTotal} />
      );
    });

    return(
      <div>
        <ProductForm handleCreate = {this.createProduct} />
        {products}
        <Total total={this.state.total} />
      </div>
    );
  }
}

ReactDOM.render(<ProductList/>, document.getElementById("root"));
