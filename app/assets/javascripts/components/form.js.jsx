var ProductForm = React.createClass({
  getInitialState: function(){
    return {productUrl: "", productName: ""};
  },
  handleTextChange: function(e) {
    this.setState({productUrl: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var productUrl = this.state.productUrl.trim();
    if (!productUrl) {
      return;
    }
    $.ajax({
      url: "/products",
      dataType: 'json',
      type: 'POST',
      data: {product: {product_url: this.state.productUrl}},
      success: function(data) {
        this.displayProduct(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/products", status, err.toString());
      }
    });
    this.setState({productUrl: ''});
  },
  displayProduct: function(product){
    this.setState({productName: product.name});
  },
  render: function() {
    return <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref="userInput" name="product_url" value={this.state.productUrl} onChange={this.handleTextChange}/>
              <input type="submit" value="Get Product" ></input>
            </form>
            <Product url={this.state.productUrl} name={this.state.productName} />
           </div>;
  }
});
