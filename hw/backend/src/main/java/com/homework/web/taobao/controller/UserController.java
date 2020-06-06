package com.homework.web.taobao.controller;

import com.homework.web.taobao.entity.UserEntity;
import com.homework.web.taobao.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController

@CrossOrigin  // 允许跨域访问
@RequestMapping("/user")
public class UserController {
    /**
     * 注册接口
     * @return
     */
    @Autowired
    private UserService userService ;


    @RequestMapping(value = "/register",method = RequestMethod.POST, headers = "Accept=application/json")
    public String register(@RequestParam("name") String name, @RequestParam("password") String password){
        UserEntity user=userService.getByName(name);
        if(userService.getByName(name)!=null){
            return "fail";
        }
        else {
            userService.userInsert(name, password);
            return "succeed";
        }
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST, headers = "Accept=application/json")
    public String login(@RequestParam("name") String name, @RequestParam("password") String password){
        if(userService.userValid(name,password)){
            return "succeed";
        }
        else {
            return "fail";
        }
    }






}
