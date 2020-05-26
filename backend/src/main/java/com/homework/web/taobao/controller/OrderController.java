package com.homework.web.taobao.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.homework.web.taobao.entity.GoodsEntity;
import com.homework.web.taobao.entity.HasgoodsEntity;
import com.homework.web.taobao.entity.OrderEntity;
import com.homework.web.taobao.service.GoodsService;
import com.homework.web.taobao.service.HasgoodsService;
import com.homework.web.taobao.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.alibaba.fastjson.JSON.toJSONString;

@RestController

@CrossOrigin  // 允许跨域访问
@RequestMapping("/cart")
public class OrderController {

    @Autowired
    private OrderService orderService ;

    @Autowired
    private HasgoodsService hasgoodsService ;

    @Autowired
    private GoodsService goodsService ;

    @RequestMapping(value = "/setorder", method = RequestMethod.POST, produces = "application/x-www-form-urlencoded")
    public String getByJSON(@RequestBody String jsonParam) {
        //获得前端获得json字符串并解析成jsonarray的形式
        JSONArray array=new JSONArray().parseArray(jsonParam);
        String name=array.getJSONObject(0).getString("name");
        String date=array.getJSONObject(0).getString("date");
        String totalprice=array.getJSONObject(0).getString("totalprice");

        //订单信息插入
        int orderid=orderService.orderInsert(name,date,totalprice);


        //订单与货物关系插入
        for (int i = 0; i < array.size(); i++) {
            JSONObject jsonObject = array.getJSONObject(i);
            int num = Integer.parseInt(  jsonObject.getString("num"));
            int goodsid = Integer.parseInt( jsonObject.getString("goodsid"));
            hasgoodsService.hasgoodsInsert(orderid,goodsid,num);
        }


        return "ok";
    }
    public String getGoods(Integer orderid)
    {
        List<HasgoodsEntity> hasgoodsArray=hasgoodsService.getByOrderid(orderid);
        String content="";
        for(int i=0;i<hasgoodsArray.size();++i){
            String info=hasgoodsArray.get(i).getNum()+" "+hasgoodsArray.get(i).getGoodsname()+"\n";
            content+=info;
        }
        return content;
    }
    @RequestMapping(value = "/getorder",method = RequestMethod.POST, headers = "Accept=application/json")
    public String getOrder(@RequestParam("name") String name){
        List<OrderEntity> orders=orderService.getOrder(name);
        JSONArray json = new JSONArray();
        for(int i=0;i<orders.size();i++){
            JSONObject jo = new JSONObject();
            jo.put("orderid", Integer.toString(orders.get(i).getOrderid()));
            jo.put("name", orders.get(i).gettName());
            jo.put("date", orders.get(i).getDate());
            jo.put("totalprice", orders.get(i).getTotalprice());
            jo.put("content",getGoods(orders.get(i).getOrderid()));
            json.add(jo);
        }

        String myorders= JSON.toJSONString(json);
        return myorders;
    }


}
