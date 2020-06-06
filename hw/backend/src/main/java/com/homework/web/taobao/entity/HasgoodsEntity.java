package com.homework.web.taobao.entity;

public class HasgoodsEntity {
    Integer orderid;
    Integer goodsid;
    Integer num;
    String goodsname;
    public void setNum(Integer num) {
        this.num = num;
    }
    public void setGoodsid(Integer goodsid) {
        this.goodsid = goodsid;
    }
    public void setOrderid(Integer orderid) {
        this.orderid = orderid;
    }
    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname;
    }
    public String getGoodsname() {
        return this.goodsname;
    }
    public Integer getNum() {
        return this.num;
    }
}
