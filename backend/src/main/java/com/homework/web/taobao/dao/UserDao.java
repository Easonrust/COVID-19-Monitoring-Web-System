package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserDao {

    UserEntity getById(String id);
    int userInsert(UserEntity user);
}


