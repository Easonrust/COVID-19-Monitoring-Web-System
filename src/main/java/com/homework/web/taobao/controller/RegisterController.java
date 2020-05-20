package com.homework.web.taobao.controller;

import com.homework.web.taobao.entity.UserEntity;
import com.homework.web.taobao.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class RegisterController {
    /**
     * 注册接口
     * @return
     */
    @Autowired
    private UserService userService ;


    @RequestMapping(value = "/register",method = RequestMethod.POST, headers = "Accept=application/json")
    public String reg(@RequestParam("name") String name, @RequestParam("id") String id, HttpSession session){
        userService.userInsert(name ,id);
        session.setAttribute("loginUser",id);
        return "ok";
    }






}
