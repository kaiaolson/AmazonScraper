var ProductForm = React.createClass({
  getInitialState: function(){
    return {inputUrl: "",
            productUrl: "",
            productName: "",
            productDescription: "",
            errorMsg: ""};
  },
  handleTextChange: function(e) {
    this.setState({inputUrl: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var inputUrl = this.state.inputUrl.trim();
    if (!inputUrl) {
      return;
    }
    $.ajax({
      url: "/products",
      dataType: 'json',
      type: 'POST',
      data: {product: {product_url: this.state.inputUrl}},
      success: function(data) {
        this.displayProduct(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/products", status, err.toString());
        if(err === 503) {
          this.setState({errorMsg: "Amazon's not responding, please try again!"});
        }
      }
    });
    this.setState({inputUrl: ''});
  },
  displayProduct: function(product){
    this.setState({productName: product.name, productUrl: product.product_url, productDescription: product.description});
  },
  render: function() {
    return <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref="userInput" name="product_url" value={this.state.inputUrl} onChange={this.handleTextChange}/>
              <input type="submit" value="Get Product" ></input>
            </form>
            <Product url={this.state.productUrl} target="_blank" name={this.state.productName} description={this.state.productDescription}/>
            <p>{this.state.errorMsg}</p>
           </div>;
  }
});
