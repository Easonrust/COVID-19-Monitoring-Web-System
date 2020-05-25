package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.GoodsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface GoodsDao {

    int goodsInsert(GoodsEntity user);
}

