// pages/car/car.js
import { getOrder, getchkOrder } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chooseAddress: {},
        cartList: [],
        totalPrice: 0,
        totalNum: 0

    },
    // 设置购物车的全选 总价格 购买的数量
    setCart(cartList) {
        // 1 总价格 总数量
        let totalPrice = 0;
        let totalNum = 0;
        cartList.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        })
        this.setData({
            cartList,
            totalPrice,
            totalNum,
        });
    },
    async handleOrderPay() {
        try {
            //判断缓存中有没有token 
            const token = wx.getStorageSync("token");
            //判断
            if (!token) {
                wx.navigateTo({
                    url: '/pages/aut/aut'
                });
                return;
            }
            const header = { "Authorization": token };
            const order_price = this.data.totalPrice;
            const consignee_addr = this.data.chooseAddress;
            let goods = [];
            this.data.cartList.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price
            }))
            const orderParams = { order_price, consignee_addr, goods };
            // 获取订单号
            const res = await getOrder(orderParams, header)
                // console.log(res)
                // 发起支付
            wx.requestPayment({
                timeStamp: '',
                nonceStr: '',
                package: '',
                signType: '',
                paySign: '',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
            const order_number = 'HMDD20190802000000000422';
            // 擦寻订单状态
            const chkOrder = await getchkOrder(order_number);
            console.log(chkOrder);
            wx.showToast({
                title: '支付成功了',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });


        } catch (error) {
            wx.showToast({
                title: '支付失败',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });

        }
        // 跳到购物车
        wx.switchTab({
            url: '../car/car',
        });
        // 删除购物车中，已支付的
        let newCart = wx.getStorageSync("cartList");
        newCart = newCart.filter(v => !v.checked);
        wx.setStorageSync('cartList', newCart);

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
        // console.log(cartList)

        cartList = cartList.filter(v => v.checked);

        // console.log(cartList)
        this.setData({ chooseAddress });
        this.setData({ cartList });
        this.setCart(cartList);
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