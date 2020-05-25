package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.OrderEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface OrderDao {
    int orderInsert(OrderEntity user);
}
