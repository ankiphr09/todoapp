import './App.css';
import React from 'react';
import Listitems from './Listitems';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            items:[],
            currentItem:{
                text:'',
                key:''
            }
        }
        this.handleInput=this.handleInput.bind(this);
        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.setUpdate=this.setUpdate.bind(this);
    }
    handleInput(e){
        this.setState({
            currentItem:{
                text:e.target.value,
                key:Date.now()
            }
        })
    }
    addItem(e){
        e.preventDefault();
        const newItem=this.state.currentItem;
        //console.log(newItem);
        if(newItem.text!==""){
            const items=[...this.state.items,newItem];
            this.setState({
                items:items,
                currentItem:{
                    text:'',
                    key:''
                }
            })
        }
        
    }
    deleteItem(key){
        const filteredItems= this.state.items.filter(item=>item.key!==key);
        this.setState({
            items:filteredItems
        })
    }
    setUpdate(text,key){
        const items= this.state.items;
        // eslint-disable-next-line array-callback-return
        items.map(item => {
            if(item.key===key){
                item.text=text;
            }
        })
        this.setState({
            items:items
        })
    }
    render() {
        return (
            <div className='App'>
                <header>
                    <form id='to-do-form' onSubmit={this.addItem}>
                        <input type='text' placeholder='Enter Item'
                        value={this.state.currentItem.text}
                        onChange={this.handleInput} />
                        <button type='submit'>Add</button>
                    </form>
                </header>
                <Listitems items={this.state.items}
                deleteItem={this.deleteItem}
                setUpdate={this.setUpdate}></Listitems>
            </div>

        );
    }
}
export default App;
