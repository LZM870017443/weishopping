import { getdetailobj } from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailObj: {},
        // 商品是否被收藏
        isCollect: false
    },
    // 商品ID
    goods_id: 0,
    // 商品对象
    GoodsInfo: {},
    // 获取详情页数据
    async getdetail(goods_id) {
        const detailObj = await getdetailobj(goods_id);
        this.GoodsInfo = detailObj
        let collect = wx.getStorageSync("collect") || [];
        // 判断当前商品是否被收藏
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
        // console.log(detailObj)
        this.setData({
            detailObj: {
                goods_name: detailObj.goods_name,
                goods_price: detailObj.goods_price,
                // iphone部分手机 不识别 webp图片格式 
                goods_introduce: detailObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: detailObj.pics
            },
            isCollect
        });
    },

    // 点击轮播图 放大预览
    handlePrevewImage(e) {
        // 1 先构造要预览的图片数组 
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        // 2 接收传递过来的图片url
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls
        });

    },
    // 加入购物车
    handleCartAdd() {

        // console.log("加入购物车")
        let cart = wx.getStorageSync("cartList") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            // console.log(this.GoodsInfo.num)
            cart.push(this.GoodsInfo);
        } else {
            cart[index].num++;
            // console.log(this.GoodsInfo)
        }
        wx.setStorageSync("cartList", cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        });

    },
    // 点击 商品收藏图标
    handleCollect() {
        let isCollect = false;
        // 1 获取缓存中的商品收藏数组
        let collect = wx.getStorageSync("collect") || [];
        // 2 判断该商品是否被收藏过
        let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        // 3 当index！=-1表示 已经收藏过 
        if (index !== -1) {
            // 能找到 已经收藏过了  在数组中删除该商品
            collect.splice(index, 1);
            isCollect = false;
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
            });

        } else {
            // 没有收藏过
            collect.push(this.GoodsInfo);
            isCollect = true;
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
            });
        }
        // 4 把数组存入到缓存中
        wx.setStorageSync("collect", collect);
        // 5 修改data中的属性  isCollect
        this.setData({
            isCollect
        })


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        // this.goods_id = options.goods_id
        // this.getdetail()


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
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        const { goods_id } = options;
        this.getdetail(goods_id);
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