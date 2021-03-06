class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
      productList
      { id 
        category 
        name 
        price 
        image
        }
      }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    this.setState({
      products: result.data.productList
    });
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: productinputs!) {
      productAdd(product: $product) {
        id
      }
    }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          product
        }
      })
    });
    this.loadData();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h3", null, "My Company Inventory"), React.createElement("h4", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("h4", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

function ProductRow(props) {
  const product = props.product;
  return React.createElement("tr", null, React.createElement("td", null, product.name), React.createElement("td", null, "$", product.price), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
    href: product.image,
    target: "_blank"
  }, "View")));
}

function ProductTable(props) {
  const productRows = props.products.map(product => React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const pricewithdollar = form.price.value;
    const removeddollarprice = pricewithdollar.substring(1);
    const product = {
      name: form.name.value,
      price: removeddollarprice,
      category: form.category.value,
      image: form.image.value
    };
    this.props.createProduct(product);
    form.name.value = " ";
    form.category.value = " ";
    form.price.value = "$";
    form.image.value = " ";
  }

  render() {
    return React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit,
      className: "addprodstyle"
    }, React.createElement("div", null, React.createElement("label", null, "Category"), React.createElement("select", {
      name: "category"
    }, React.createElement("option", {
      value: "Shirts",
      defaultValue: true
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories")), React.createElement("label", null, "Price Per Unit"), React.createElement("input", {
      type: "text",
      name: "price",
      defaultValue: "$"
    })), React.createElement("div", null, React.createElement("label", null, "Product Name"), React.createElement("input", {
      type: "text",
      name: "name"
    }), React.createElement("label", null, "Image URL"), React.createElement("input", {
      type: "url",
      name: "image"
    })), React.createElement("button", null, "Add Product"));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));