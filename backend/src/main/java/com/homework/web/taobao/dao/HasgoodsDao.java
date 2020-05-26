package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.HasgoodsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface HasgoodsDao {
    int hasgoodsInsert(HasgoodsEntity hasgoods);
    List<HasgoodsEntity> getByOrderid(Integer orderid);
}
