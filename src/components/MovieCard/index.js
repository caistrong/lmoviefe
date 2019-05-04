import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtRate, AtIcon, AtFloatLayout, AtToast, AtBadge } from 'taro-ui'
import fly from '../../constants/fly'

import './index.scss'

class MovieCard extends Component {

  static defaultProps = {
    movie: {}
  }

  constructor(props) {
    super(props)
    this.handleToggleFloatLayout = this.handleToggleFloatLayout.bind(this)
    this.onClickHeart = this.onClickHeart.bind(this)
    const { movie } = props;
    this.state = {
      showFloatLayout: false,
      showLikingToast: false,
      toastText: '',
      likingStatus: '',
      userLike: movie.userLikeMovie,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleToggleFloatLayout() {
    this.setState({
      showFloatLayout: !this.state.showFloatLayout
    })
  }

  async onClickHeart() {
    this.setState({
      likingStatus: 'loading',
      toastText: '加载中...',
      showLikingToast: true,
    })
    if (!this.state.userLike) {
      let rsp = await fly.post('/api/user_like_movie', {
        movieId: this.props.movie.id
      });
      let data = rsp.data;
      if (data.code === 0) {
        this.setState({
          likingStatus: 'success',
          toastText: '已收藏到我喜欢',
          userLike: true,
        })
      } else {
        this.setState({
          likingStatus: 'error',
          toastText: '失败',
        })
      }
    } else {
      let rsp = await fly.post('/api/user_unlike_movie', {
        movieId: this.props.movie.id
      });
      let data = rsp.data;
      if (data.code === 0) {
        this.setState({
          likingStatus: 'success',
          toastText: '已取消喜欢',
          userLike: false,
        })
      } else {
        this.setState({
          likingStatus: 'error',
          toastText: '失败',
        })
      }
    }
  }
  render() {
    return (
      <View>
        <View className='movie-card at-row'>
          <View className='poster-box at-col at-col-3'>
            <Image
              className='poster-img'
              src={this.props.movie.posterUrl}
            />
          </View>
          <View className='info-box at-col at-col-7' onClick={this.handleToggleFloatLayout}>
            <AtBadge value={this.props.movie.source === 1 ? 'hot' : ''}>
              <Text className='title-text'>{this.props.movie.title}</Text>
            </AtBadge>
            <AtRate value={this.props.movie.rate / 20} size={16} />
            <Text>{this.props.movie.rate / 10}</Text>
            <Text className='desc-text'>{(JSON.parse(this.props.movie.directors) instanceof Array) ? JSON.parse(this.props.movie.directors).join('/') : ''}</Text>
            <Text className='desc-text'>{`${this.props.movie.nations}/${this.props.movie.languages}`}</Text>
            <Text className='desc-text'>{(JSON.parse(this.props.movie.directors) instanceof Array) ? JSON.parse(this.props.movie.types).join('/') : ''}</Text>
          </View>
          <View className='operate-box at-col at-col-2'>
            <AtIcon value={this.state.userLike ? 'heart-2' : 'heart'} size='30' color='#F00' onClick={this.onClickHeart}></AtIcon>
          </View>
        </View>
        <AtFloatLayout isOpened={this.state.showFloatLayout} title={`${this.props.movie.title}-简介`} onClose={this.handleToggleFloatLayout}>
          {this.props.movie.summary}
        </AtFloatLayout>
        <AtToast isOpened={this.state.showLikingToast} text={this.state.toastText} status={this.state.likingStatus} duration={1000}></AtToast>
      </View>
    )
  }
}

export default MovieCard
