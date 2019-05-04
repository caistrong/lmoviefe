import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getUserInfo } from '../../actions/user'

import './index.scss'


class Mine extends Component {
  constructor(props) {
    super(props)
    this.goToMyLikesPage = this.goToMyLikesPage.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {
    this.props.dispatchGetUserInfo()
  }

  componentDidShow() { }

  componentDidHide() { }
  goToMyLikesPage() {
    Taro.navigateTo({
      url: '/pages/myLikes/index'
    })
  }

  render() {
    return (
      <View>
        <View className='profile-box'>
          <View className='profile-avatar'>
            <AtAvatar circle image={this.props.user.userInfo.avatarUrl}></AtAvatar>
          </View>
          <Text className='profile-nickname'>{this.props.user.userInfo.nickName}</Text>
        </View>
        <AtList>
          <AtListItem title='我喜欢的' arrow='right' onClick={this.goToMyLikesPage} />
        </AtList>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  dispatchGetUserInfo() {
    dispatch(getUserInfo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Mine)
