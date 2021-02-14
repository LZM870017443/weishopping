// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseAddress: {},
        cartList: [],
        allChecked: [],
        totalPrice: 0,
        totalNum: 0

    },
    // 获取收获地址
    hander_chooseAddress() {
        // console.log("ddd")
        wx.chooseAddress({
            success: (result) => {
                // console.log(result);
                let chooseAddress = result
                chooseAddress.all = chooseAddress.provinceName + chooseAddress.cityName + chooseAddress.countyName + chooseAddress.detailInfo;
                wx.setStorageSync("Address", chooseAddress);
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 设置购物车的全选 总价格 购买的数量
    setCart(cartList) {
        let allChecked = true;
        // 1 总价格 总数量
        let totalPrice = 0;
        let totalNum = 0;
        cartList.forEach(v => {
                if (v.checked) {
                    totalPrice += v.num * v.goods_price;
                    totalNum += v.num;
                } else {
                    allChecked = false;
                }
            })
            // 判断数组是否为空
        allChecked = cartList.length != 0 ? allChecked : false;
        this.setData({
            cartList,
            totalPrice,
            totalNum,
            allChecked
        });
        wx.setStorageSync("cartList", cartList);
    },
    // 商品单个选中
    handeItemChange(e) {
        // 1 获取被修改的商品的id
        const goods_id = e.currentTarget.dataset.id;
        // 2 获取购物车数组 
        let { cartList } = this.data;
        // 3 找到被修改的商品对象
        let index = cartList.findIndex(v => v.goods_id === goods_id);
        // 4 选中状态取反
        cartList[index].checked = !cartList[index].checked;
        this.setCart(cartList);

    },
    // 商品全选
    handleItemAllCheck() {
        // 1 获取data中的数据
        let { cartList, allChecked } = this.data;
        // 2 修改值
        allChecked = !allChecked;
        // 3 循环修改cart数组 中的商品选中状态
        cartList.forEach(v => v.checked = allChecked);
        // 4 把修改后的值 填充回data或者缓存中
        this.setCart(cartList);
    },
    handleItemNumEdit(e) {
        // console.log(e)
        const { operation, id } = e.currentTarget.dataset
            // console.log(operation, id)
        let { cartList } = this.data
        const index = cartList.findIndex(v => v.goods_id === id);

        if (cartList[index].num === 1 && operation === -1) {
            wx.showModal({
                title: '提示',
                content: '确定删除该商品吗',
                success: (res) => {
                    if (res.confirm) {
                        // console.log('用户点击确定');
                        cartList.splice(index, 1);
                        this.setCart(cartList)
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            cartList[index].num += operation;
            this.setCart(cartList)
        }


    },
    handlePay() {
        const { chooseAddress, totalNum } = this.data;
        if (!chooseAddress) {
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                duration: 1500,
                mask: false,

            });
            return
        }
        if (totalNum === 0) {
            wx.showToast({
                title: '请选购商品',
                icon: 'none',
                duration: 1500,
                mask: false,
            });
            return
        }
        wx.navigateTo({
            url: '../pay/pay',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let chooseAddress = wx.getStorageSync("Address");
        let cartList = wx.getStorageSync("cartList") || [];
        this.setData({ chooseAddress });
        this.setData({ cartList });
        this.setCart(cartList);
        // console.log(cartList)
        // const allChecked = cartList.length ? cartList.every(v => v.checked) : false;
        // this.setData({ allChecked });
        // console.log(cartList.length)
        // let allChecked = true;
        // // 1 总价格 总数量
        // let totalPrice = 0;
        // let totalNum = 0;
        // this.data.cartList.forEach(v => {
        //         if (v.checked) {
        //             totalPrice += v.num * v.goods_price;
        //             totalNum += v.num;
        //         } else {
        //             allChecked = false;
        //         }
        //     })
        //     // 判断数组是否为空
        // allChecked = cartList.length != 0 ? allChecked : false;
        // this.setData({
        //     cartList,
        //     totalPrice,
        //     totalNum,
        //     allChecked
        // });
        // wx.setStorageSync("cartList", cartList);

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})