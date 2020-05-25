package com.homework.web.taobao.service;

import com.homework.web.taobao.dao.OrderDao;

import com.homework.web.taobao.entity.OrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderDao orderDao ;

    public int orderInsert(String name,String date,String totalprice) {
        OrderEntity order=new OrderEntity();
        order.setName(name);
        order.setDate(date);
        order.setTotalprice(totalprice);
        return orderDao.orderInsert(order);
    }
}
