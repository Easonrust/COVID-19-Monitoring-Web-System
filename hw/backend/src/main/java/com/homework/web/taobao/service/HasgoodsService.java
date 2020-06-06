package com.homework.web.taobao.service;

import com.homework.web.taobao.dao.HasgoodsDao;
import com.homework.web.taobao.dao.OrderDao;
import com.homework.web.taobao.entity.HasgoodsEntity;
import com.homework.web.taobao.entity.OrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HasgoodsService {
    @Autowired
    private HasgoodsDao hasgoodsDao ;
    public int hasgoodsInsert(int orderid,int goodsid,int num) {
        HasgoodsEntity hasgoods=new HasgoodsEntity();
        hasgoods.setNum(num);
        hasgoods.setGoodsid(goodsid);
        hasgoods.setOrderid(orderid);
        return hasgoodsDao.hasgoodsInsert(hasgoods);
    }

    public List<HasgoodsEntity> getByOrderid(Integer orderid){
        return hasgoodsDao.getByOrderid(orderid);
    }
}
