package com.homework.web.taobao.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.homework.web.taobao.service.HasgoodsService;
import com.homework.web.taobao.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.alibaba.fastjson.JSON.toJSONString;

@RestController

@CrossOrigin  // 允许跨域访问
@RequestMapping("/cart")
public class OrderController {

    @Autowired
    private OrderService orderService ;

    @Autowired
    private HasgoodsService hasgoodsService ;

    @RequestMapping(value = "/setorder", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public String getByJSON(@RequestBody String jsonParam) {
        //获得前端获得json字符串并解析成jsonarray的形式
        JSONArray array=new JSONArray().parseArray(jsonParam);
        String name=array.getJSONObject(0).getString("name");
        String date=array.getJSONObject(0).getString("date");
        String totalprice=array.getJSONObject(0).getString("totalprice");

        //订单信息插入
        orderService.orderInsert(name,date,totalprice);


//        //订单与货物关系插入
//        for (int i = 0; i < array.size(); i++) {
//            JSONObject jsonObject = array.getJSONObject(i);
//            int num = Integer.parseInt(  jsonObject.getString("num"));
//            int goodsid = Integer.parseInt( jsonObject.getString("goodsid"));
//            hasgoodsService.hasgoodsInsert(num,goodsid);
//        }


        return "ok";
    }

//    @RequestMapping(value = "/getorder",method = RequestMethod.POST, headers = "Accept=application/json")
//    public String login(@RequestParam("name") String name){
//        OrderEntity[] orders=getOrder(name);
//        String myorders=toJSONString(orders);
//        return myorders;
//    }
}
