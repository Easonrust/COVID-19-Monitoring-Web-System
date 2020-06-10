package com.homework.web.covid.dao;

import com.homework.web.covid.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserDao {

    UserEntity getByName(String name);
    int userInsert(UserEntity user);
}


