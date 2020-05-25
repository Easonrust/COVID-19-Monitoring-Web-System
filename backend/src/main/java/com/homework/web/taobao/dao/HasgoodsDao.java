package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.HasgoodsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface HasgoodsDao {
    int hasgoodsInsert(HasgoodsEntity hasgoods);
}
