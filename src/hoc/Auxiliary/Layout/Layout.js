import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerOpened: false
    };
    // sideDrawerHandler = () => {
    //     this.setState({sideDrawerOpened : true})
    //}
    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {sideDrawerOpened: !prevState.sideDrawerOpened}
        });
    }
    
    render(){
        return(
            <Auxiliary>
                <Toolbar click = {this.sideDrawerToggle}/>
                <SideDrawer show = {this.state.sideDrawerOpened} click = {this.sideDrawerToggle}/>
                <main className ={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>

        );
    }
}

export default Layout;