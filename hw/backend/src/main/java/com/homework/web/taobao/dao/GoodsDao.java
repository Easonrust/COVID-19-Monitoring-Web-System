package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.GoodsEntity;
import com.homework.web.taobao.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface GoodsDao {
    List<GoodsEntity> getAllgoods();
}

