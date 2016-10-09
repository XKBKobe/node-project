/**
 * @Author:jiao.shen
 * @Date: 2016-09-12
 * @Description: export preloading Data,and the data format simulation server.
 *      name rule: Preload + pageName(or view name) + moduleName
 */

/**
 * cause only used ad_image, so i just pushed ad_image
 * at the meanwhile,banner gonna only render 3 pages, 
 * so 3 datas enough.
 */
const PreLoadHomeBanner = [
    { ad_image: {width: 970,height:420,url:'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg'} },
    { ad_image: {width: 970,height:420,url:'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg'} },
    { ad_image: {width: 970,height:420,url:'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg'} }
];

const PreloadHomeCategory = {categorys: [
    { categoryId: 46,categoryName: "美妆个护" },
    { categoryId: 1, categoryName: "瘦身美丽" },
    { categoryId: 2, categoryName: "休闲食品" },
    { categoryId: 3, categoryName: "营养保健" },
    { categoryId: 4, categoryName: "母婴健康" }
]}

const PreloadHomeThematic = [
    {
        imgMain: {url: 'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg',width:750,height:320},
        goodlist:[
            {
                goodsId: 0,
                goodsName: "没有商品",
                goodsMsrp: 0.00,
                goodsSalePrice: 0.00,
                imgMain: {url: 'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg',width:750,height:320}
            },
            {
                goodsId: 0,
                goodsName: "没有商品",
                goodsMsrp: 0.00,
                goodsSalePrice: 0.00,
                imgMain: {url: 'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg',width:750,height:320}
            },
            {
                goodsId: 0,
                goodsName: "没有商品",
                goodsMsrp: 0.00,
                goodsSalePrice: 0.00,
                imgMain: {url: 'http://bestinfoods.oss-cn-hangzhou.aliyuncs.com/Mobile%2FreactImage%2Fpreload_image.jpg',width:750,height:320}
            }
        ]
    }
]

module.exports = {
    PreLoadHomeBanner,
    PreloadHomeCategory,
    PreloadHomeThematic,
}

