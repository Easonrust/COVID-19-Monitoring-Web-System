package com.homework.web.taobao.service;

import com.homework.web.taobao.dao.GoodsDao;
import com.homework.web.taobao.dao.UserDao;
import com.homework.web.taobao.entity.GoodsEntity;
import com.homework.web.taobao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsService {
    @Autowired
    private GoodsDao goodsDao ;
    public List<GoodsEntity> getAllgoods(){
        return goodsDao.getAllgoods();
    }
}
