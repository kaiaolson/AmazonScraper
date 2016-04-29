var Products = React.createClass ({
  getInitialState: function(){
    return {products: []};
  },
  componentDidMount: function(){
    $.ajax({
      url: "http://localhost:3000/products.json",
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({products: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/products", status, err.toString());
      }
    });
  },
  displayProducts: function(){
    if(this.state.products.length > 0) {
      return this.state.products.map(function(product, index){
        return <Product url={"products/" + product.id} name={product.name} key={index}/>
      });
    } else {
      return "No products to display!";
    }
  },
  render: function(){
    return <div>
            <h1>Products</h1>
            {this.displayProducts()}
           </div>;
  }
});
