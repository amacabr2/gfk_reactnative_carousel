import React from 'react';
import {Image, View, Dimensions, PanResponder, Animated, TouchableHighlight} from "react-native";

export default class MoviesCarousel extends React.Component {

    static proTypes = {
        movies: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        let {width} = Dimensions.get('window');
        this.state = {
            width: width,
            translate: new Animated.Value(0),
            page: 0
        };
    }

    showMovie(movie) {
        alert(movoe.name);
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, getsureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: Animated.event([null, {dx: this.state.translate}]),
            onPanResponderRelease: this.endGesture.bind(this),
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('Termine');
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true
        });
    }

    endGesture(evt, gestureState) {
        let toValue = 0;
        if (Math.abs(gestureState.dx) / this.state.width > 0.2) {
            if (gestureState.dx < 0) {
                toValue = this.state.width * -1;
            } else {
                toValue = this.state.width;
            }
        }
        Animated.timing(
            this.state.translate,
            {
                duration: 300,
                toValue: toValue,
                useNativeDriver: true
            }
        ).start(() => {
            this.state.translate.setValue(0);
            if (toValue < 0) {
                this.nextPage();
            } else {
                this.prevPage();
            }
        });
    }

    nextPage() {
        let page = this.state.page + 1;
        if (page > this.props.movies.length - 1) {
            page = 0
        }
        this.setState({page});
    }

    prevPage() {
        let page = this.state.page - 1;
        if (page < 0) {
            page = this.props.movies.length -1;
        }
        this.setState({page});
    }

    getStyle() {
        return {
            slider: {
                flexDirection: 'row',
                height: 390,
                backgroundColor: '#1b1b1b',
                width: (this.props.movies.length + 2) * this.state.width,
                left: (this.state.page + 1) * -1 * this.state.width,
                transform: [{
                    translateX: this.state.translate
                }]
            },
            slide: {
                width: this.state.width,
                height: 390,
                position: 'relative'
            },
            screen: {
                width: this.state.width,
                height: 300
            },
            poster: {
                position: 'absolute',
                top: 150,
                left: 25,
                height: 220,
                width: 150
            },
            titleContainer: {
                backgroundColor: 'transparent',
                position: 'absolute',
                left: 200,
                top: 330,
                right: 0,
                overflow: 'hidden'
            },
            title: {
                color: '#ffffff',
                fontSize: 18,
            }
        }
    }

    renderMovie(movie, k) {
        const style = this.getStyle();
        return (
            <View key={k} style={style.slide}>
                <TouchableHighlight onPress={() => this.showMovie(movie)}>
                    <Image source={movie.screen} style={style.screen}/>
                </TouchableHighlight>
                <Animated.Image source={movie.poster} style={[style.poster, this.posterTranslate(k)]}/>
                <View style={style.titleContainer}>
                    <Animated.Text style={[style.title, this.posterTranslate(k)]}>{movie.name}</Animated.Text>
                </View>
            </View>
        );
    }

    posterTranslate(index) {
        let factor = 2;
        if (index === this.state.page) {
           return this.translateX(
               Animated.divide(this.state.translate, factor)
           );
        }
        if (index === this.state.page + 1) {
            return this.translateX(
                Animated.divide(Animated.add(this.state.translate, this.state.width), factor)
            );
        }
        if (index === this.state.page + 1) {
            return this.translateX(
                Animated.divide(Animated.add(this.state.translate, this.state.width * -1), factor)
            );
        }
        return this.translateX(new Animated.Value(0));
    }

    translateX(animation) {
        return {
            transform: [{
                translateX: animation
            }]
        }
    }

    render() {
        const style = this.getStyle();
        return (
            <Animated.View {...this.panResponder.panHandlers} style={style.slider}>
                {this.renderMovie(this.props.movies[this.props.movies.length - 1], -1)}
                {this.props.movies.map(this.renderMovie.bind(this))}
                {this.renderMovie(this.props.movies[0], this.props.movies.length)}
            </Animated.View>
        )
    }

}