package com.homework.web.taobao.service;
import com.homework.web.taobao.dao.UserDao;
import com.homework.web.taobao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao ;

    public UserEntity getById(String id){
        return userDao.getById(id);
    }
    public int userInsert(String name ,String id) {
        UserEntity user=new UserEntity();
        user.setName(name);
        user.setId(id);
        return userDao.userInsert(user);
    }
}