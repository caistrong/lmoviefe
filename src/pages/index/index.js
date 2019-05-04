import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import MovieList from '../../components/MovieList'
import Mine from '../../components/Mine'
import './index.scss'
import { loginAndInitMovieList } from '../../actions/user'
import { getMovieList } from '../../actions/movies'
import { GET_MOVIES_SUCCESS } from '../../constants/actionTypes'

class Index extends Component {

  constructor(props) {
    super(props)
    this.onClickTabBar = this.onClickTabBar.bind(this)
    this.state = {
      currentSelected: 0
    }
  }
  config = {
    navigationBarTitleText: '推荐',
    enablePullDownRefresh: true, //当前页
    backgroundTextStyle: "dark" //顶部显示颜色为深色的三个点
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {
    this.props.dispatchLoginAndInitMovieList()
  }

  componentDidShow() { }

  componentDidHide() { }

  onPullDownRefresh() {
    this.props.dispatchGetMovieList()
    Taro.stopPullDownRefresh()
  }

  onClickTabBar(idx) {
    this.setState({
      currentSelected: idx
    })
  }

  render() {
    return (
      <View>
        {
          this.state.currentSelected === 0 ?
            <MovieList data={this.props.movies.movielist} isloading={this.props.movies.status !== GET_MOVIES_SUCCESS} /> :
            <Mine />
        }
        <AtTabBar
          fixed
          tabList={[
            { title: '推荐', iconType: 'video' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.onClickTabBar}
          current={this.state.currentSelected}
          color='#B2B2B2'
          selectedColor='#333333'
        />
      </View>
    )
  }
}

const mapStateToProps = ({ movies }) => ({
  movies
})

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAndInitMovieList() {
    dispatch(loginAndInitMovieList())
  },
  dispatchGetMovieList() {
    dispatch(getMovieList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
