package com.homework.web.taobao.entity;

public class OrderEntity {
    protected int orderid ;

    protected String name;
    protected String date;
    protected String totalprice;

    public void setName(String name) {
        this.name = name;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public void setTotalprice(String totalprice) {
        this.totalprice = totalprice;
    }
}
