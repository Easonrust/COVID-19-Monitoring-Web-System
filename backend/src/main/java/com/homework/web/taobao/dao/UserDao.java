package com.homework.web.taobao.dao;

import com.homework.web.taobao.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserDao {

    UserEntity getByName(String name);
    int userInsert(UserEntity user);
}


