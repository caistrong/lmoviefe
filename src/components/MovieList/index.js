import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import MovieCard from '../MovieCard/index'


import './index.scss'

class MovieList extends Component {

  static defaultProps = {
    isloading: true,
    data: [],
    isShow: true
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let movielist = this.props.data;
    return (
      <View>
        {
          this.props.isloading ?
            <AtActivityIndicator mode='center'></AtActivityIndicator> :
            <View
              className='movie-box'
            >
              {movielist.map(movie => (<MovieCard
                key={movie.id}
                movie={movie}
              ></MovieCard>))}
            </View>
        }
      </View>
    )
  }
}

export default MovieList
