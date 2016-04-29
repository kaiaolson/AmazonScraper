var Product = React.createClass({
  render: function() {
    return <div>
            <h3><a href={this.props.url} target={this.props.target}>{this.props.name}</a></h3>
            <p>{this.props.description}</p>
           </div>;
  }
});
