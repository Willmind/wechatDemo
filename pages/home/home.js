const app = getApp();
Page({
  data:{
    name:'张三',
    items: [],
    inputValue: '',
    now: app.globalData.now
  },
  inputHandler(event){
    this.setData({
      inputValue: event.detail.value || ''
    })
  },
  buttonHandler(event){
    const newItem = this.data.inputValue.trim();
    if (!newItem) return;
    const itemArr = [...this.data.items, newItem];
    wx.setStorageSync('items', itemArr);
    this.setData({ items: itemArr });
  
  },

  buttonHandler2(event){
    if (!event.detail.userInfo) return;
    this.setData({
      name: event.detail.userInfo.nickName
    });

  },
  buttonHandler3(event){
    wx.navigateTo({
      url: '../second/second'
    });
  },
  onLoad() {
    const that=this;
    wx.request({
      url: 'http://localhost:3000/items',
      success(res){
        that.setData({
          items:res.data
        })
      }
    })
    const itemArr = wx.getStorageSync('items') || [];
    this.setData({ items: itemArr });
  }
});