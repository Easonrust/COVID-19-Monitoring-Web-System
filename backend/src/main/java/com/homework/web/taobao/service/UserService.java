package com.homework.web.taobao.service;
import com.homework.web.taobao.dao.UserDao;
import com.homework.web.taobao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao ;

    public UserEntity getByName(String name){
        return userDao.getByName(name);
    }
    public int userInsert(String name ,String password) {
        UserEntity user=new UserEntity();
        user.setName(name);
        user.setPassword(password);
        return userDao.userInsert(user);
    }
    public boolean userValid(String name, String password){
        if(getByName(name)!=null){
            UserEntity user=getByName(name);
            if(password.equals(user.getPassword())){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}