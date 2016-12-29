let Board = React.createClass({
    getInitialState(){
        return {lis: []}
    },
    handleClick(event){
        this.state.lis.push(this.refs.input.value);
        this.refs.input.value = '';
        this.setState();
    },
     render(){
         return (
             <div className="panel panel-default">
                 <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                 </div>
                 <div className="panel-body">
                    <ul ref="insert" className="list-group">
                        {this.state.lis.map((item, index) => {
                            return <li key={index} className="list-group-item">{item}</li>
                        })}
                    </ul>
                 </div>
                 <div className="panel-footer">
                     <input ref="input" type="text" className="form-control"/>
                     <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                 </div>
             </div>
         )
     }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));