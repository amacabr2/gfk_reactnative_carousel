import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import Carousel from './components/MoviesCarousel';
import movies from './components/movies';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: movies
        };
    }

    render() {
        return (
            <ScrollView>
                <Carousel movies={this.state.movies}/>
                <Text style={{fontSize: 70, color: '#ff0000'}}>Salut les gens</Text>
                <Text style={{fontSize: 70, color: '#ff0000'}}>Salut les gens</Text>
                <Text style={{fontSize: 70, color: '#ff0000'}}>Salut les gens</Text>
                <Text style={{fontSize: 70, color: '#ff0000'}}>Salut les gens</Text>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
