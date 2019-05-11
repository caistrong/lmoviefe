import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getUserInfo } from '../../actions/user'

import './index.scss'


class Mine extends Component {
  constructor(props) {
    super(props)
    this.goToMyLikesPage = this.goToMyLikesPage.bind(this)
    this.onGotUserInfo = this.onGotUserInfo.bind(this)
    const userInfoRaw = Taro.getStorageSync('userInfo'); // 判断是否登录
    const isLogin = userInfoRaw !== '' ? true : false;
    const userInfo = isLogin ? JSON.parse(userInfoRaw) : {};
    this.state = {
      isLogin,
      userInfo
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {

  }

  componentDidShow() { }

  componentDidHide() { }
  goToMyLikesPage() {
    Taro.navigateTo({
      url: '/pages/myLikes/index'
    })
  }
  onGotUserInfo(e) {
    let userInfoRaw = e.detail.rawData
    Taro.setStorageSync('userInfo', userInfoRaw);
    this.setState({
      isLogin: true,
      userInfo: JSON.parse(userInfoRaw),
    })
  }

  render() {
    return (
      <View>
        <View className='profile-box'>
          <View className='profile-avatar'>
            {
              this.state.isLogin ?
                <AtAvatar circle image={this.state.userInfo.avatarUrl}></AtAvatar> :
                <Button size='mini' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.onGotUserInfo}>登录</Button>
            }
          </View>
          <Text className='profile-nickname'>{this.state.userInfo.nickName}</Text>
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
