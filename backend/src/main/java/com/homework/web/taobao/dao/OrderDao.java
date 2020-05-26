package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.OrderEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderDao {
    int orderInsert(OrderEntity order);
    List<OrderEntity> getOrder(String name);

}
