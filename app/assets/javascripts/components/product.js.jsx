var Product = React.createClass({
  render: function() {
    return <div>
            <h3><a href={this.props.url} target="_blank">{this.props.name}</a></h3>
           </div>;
  }
});
