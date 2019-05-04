import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import MovieList from '../../components/MovieList'
import { getLikedMovieList } from '../../actions/movies'
import { GET_LIKED_MOVIES_SUCCESS } from '../../constants/actionTypes'
import EmptyNotice from '../../components/EmptyNotice';

class MyLikes extends Component {

  constructor(props) {
    super(props)
  }
  config = {
    navigationBarTitleText: '我喜欢的',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {
    this.props.dispatchGetLikedMovieList()
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        {
          this.props.movies.likedMovieList.length === 0 && this.props.movies.getLikedMoviesStatus === GET_LIKED_MOVIES_SUCCESS ?
            <EmptyNotice></EmptyNotice> :
            <MovieList data={this.props.movies.likedMovieList} isloading={this.props.movies.getLikedMoviesStatus !== GET_LIKED_MOVIES_SUCCESS} />
        }
      </View>
    )
  }
}

const mapStateToProps = ({ movies }) => ({
  movies
})

const mapDispatchToProps = (dispatch) => ({
  dispatchGetLikedMovieList() {
    dispatch(getLikedMovieList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyLikes)
