var ProductForm = React.createClass({
  getInitialState: function(){
    return {productUrl: "", productName: ""};
  },
  upcaseIt: function(){
    var userInput = this.refs.userInput.value;
    this.setState({productUrl: userInput.toUpperCase()})
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
        this.displayProduct(data.name);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/products", status, err.toString());
      }
    });
    this.setState({productUrl: ''});
  },
  displayProduct: function(name){
    this.setState({productName: name});
  },
  render: function() {
    return <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref="userInput" name="product_url" value={this.state.productUrl} onChange={this.handleTextChange}/>
              <input type="submit" value="Get Product" ></input>
            </form>
            <div>{this.state.productName}</div>
           </div>;
  }
});
